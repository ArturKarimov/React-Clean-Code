import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, limit, setFilter, setLimit}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder='Search...'
            />
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <MySelect
                    defaultValue='Sorting page list'
                    value={filter.sort}
                    onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                    options={[
                        {value: 'title', name: 'By name'},
                        {value: 'body', name: 'By description'}
                    ]}
                />
                <MySelect
                    defaultValue='Number of posts per page'
                    value={limit}
                    onChange={value => setLimit(value)}
                    options={[
                        {value: 5, name: '5'},
                        {value: 10, name: '10'},
                        {value: 25, name: '25'},
                        {value: -1, name: 'Show all'},
                    ]}
                />
            </div>

        </div>
    )
}

export default PostFilter