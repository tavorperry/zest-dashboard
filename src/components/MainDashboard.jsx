import { useEffect, useState } from "react";
import axios from "axios";
import { HeartFilled, LoadingOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Input, message, Modal, Table } from "antd";

import { CREATE_NEW_USER_POST_API, SEARCH_REPOS_GET_API } from "../consts.js";
import RepoInfo from "./RepoInfo.jsx";

const onlyFavParam = '&onlyFav=true';
const MainDashboard = () => {
    const [username, setUsername] = useState();
    const [userDemoLogin, setUserDemoLogin] = useState(false);
    const [currentRepo, setCurrentRepo] = useState(undefined);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleLogin = async () => {
        if (!username || username.trim() === '') {
            message.warning("username is not valid");
            return;
        }
        // for demo purposes, we're always firing this API w/o checking if it's already exist.
        return await axios.post(CREATE_NEW_USER_POST_API, null,{
            params: {
                username
            }
        }).then(() => {
            message.success('User connected');
            setUserDemoLogin(true);
        }).catch(() => {
            message.error(`error creating new user`);
        })
    };

    const handleLogout = () => {
        setUserDemoLogin(false);
        setShowOnlyFavorites(false);
        setUsername(undefined);
        setData([]);
    };

    const handleTryAgain = () => {
        fetchData();
    };

    const handleShowOnlyFavorites = () => {
        setShowOnlyFavorites(prevState => !prevState);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const prefixWithUserNameAndOnlyFav = `?username=${encodeURIComponent(username)}${showOnlyFavorites ? onlyFavParam : ''}`;
            const fullURL = SEARCH_REPOS_GET_API + (showOnlyFavorites ? prefixWithUserNameAndOnlyFav : '');
            const response = await axios.get(fullURL);
            setData(response.data.data);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [ showOnlyFavorites, userDemoLogin ]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) =>
                <p
                    onClick={() => setCurrentRepo(record)}>
                    {record.name}
                </p>,
        },
        {
            title: 'Stars',
            dataIndex: 'stars',
            key: 'stars',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.stars - b.stars,
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
        },
    ];

    const closeModal = () => {
        setCurrentRepo(undefined);
    };

    if (error) {
        return (<>
                    <p>Sorry! Error</p>
                    <Button type={"primary"} onClick={handleTryAgain}>Try again</Button>
                </>
            )
    }

    return (
        <div>
            <Flex justify={'center'} align={'center'} vertical gap={'middle'}>
                <Flex gap={'small'} justify={'center'} style={{width: '300px'}}>
                    {!userDemoLogin &&
                        <>
                            <Input onChange={handleUsernameChange} placeholder="Type your username here..." />
                            <Button onClick={handleLogin} type={'primary'} >Login</Button>
                        </>
                    }
                    {userDemoLogin &&
                        <Flex vertical gap={'middle'}>
                            <Card
                                bordered={false}
                                style={{
                                    width: 400,
                                }}
                            >
                                Connected user: {username}
                            </Card>
                            <Card>
                            <Flex justify={'space-around'}>
                                <Button icon={<HeartFilled />} onClick={ handleShowOnlyFavorites }>
                                    { showOnlyFavorites ? 'Show All' : 'Show only favorites'}
                                </Button>
                                <Button type={'primary'} onClick={handleLogout}>Logout</Button>
                            </Flex>
                            </Card>
                        </Flex>
                    }
                </Flex>
                <Modal title={`${currentRepo?.name} info`} open={!!currentRepo} onOk={ closeModal } onCancel={ closeModal }>
                    <RepoInfo repoData={currentRepo} username={username}/>
                </Modal>
                {loading && <LoadingOutlined/>}
                {!loading && !error && <Table dataSource={data} columns={columns} />}
            </Flex>
        </div>
    )
};

export default MainDashboard;
