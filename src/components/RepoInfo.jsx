import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { HeartOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Flex, message, Spin } from "antd";
import axios from 'axios';

import { ADD_TO_FAV_POST_API } from "../consts.js";
import { useState } from "react";

const RepoInfo = ({ repoData, username }) => {
    const [isAdding, setIsAdding] = useState(false);

    if (!repoData) return <div>NO DATA</div>

    const handleAddToFavorites = async () => {
        if (!username) {
            message.error('Username is required.');
            return;
        }

        setIsAdding(true);
        try {
            const response = await axios.post(ADD_TO_FAV_POST_API, null,{
                params: {
                    username: username,
                    repoId: repoData.id
                }
            });

            console.log(response.data);
            message.success('Repository added to favorites successfully!');
        } catch (error) {
            message.error(`Error! ${error?.response?.data?.error}`);
        } finally {
            setIsAdding(false);
        }
    };

    const adjustedData = [
        {name: 'Stars', value: repoData.stars},
        {name: 'Forks', value: repoData.forks},
        {name: 'Watchers', value: repoData.watchers},
        {name: 'Size', value: repoData.size},
        {name: 'Open Issues', value: repoData.open_issues_count},
    ]

    return (
        <div>

            <BarChart width={450} height={300} data={adjustedData}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" />
                <Bar dataKey="value" fill="#8884d8" barSize={30} />
            </BarChart>
            <Flex justify={'center'} align={'center'}>
                {username ? (
                    <Button danger icon={isAdding ? <Spin indicator={<LoadingOutlined />} /> : <HeartOutlined />} onClick={handleAddToFavorites} disabled={isAdding}>
                        Add to favorites
                    </Button>
                ) : (
                    <p>Connect with your user on the main page to add favorites.</p>
                )}
            </Flex>
        </div>
    );
};

export default RepoInfo;
