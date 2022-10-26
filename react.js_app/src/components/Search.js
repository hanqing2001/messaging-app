import { Children, useContext, useState } from "react";
import UserContext from "../UserContext";
import { Autocomplete } from '@mui/material'
import { TextField } from "@mui/material";

const Search = ({filteredFun, addFriend}) => {
    const {loggedInUser, users} = useContext(UserContext);
    const [searchedUser, setSearchedUser] = useState([])
    const [isFriend, setIsFriend] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const filteredUser = () => users.find(user => {
            if(user.username.toLowerCase().includes(inputValue.toLowerCase())){
                setSearchedUser(user)
                return user
            }
        })

    const filteredFriends = username => {
        return loggedInUser.friends.find(friendId => {
            const friend = users.find(user => user._id === friendId)
            if(friend.username.toLowerCase().includes(username.toLowerCase())){
                setSearchedUser(friend)
                return friend
            }
        })
    }

    const isFindFriend = () => {
        return loggedInUser.friends.find(friendId => {
            const isFind = users.find(user => {
                if(user._id === friendId){
                    return user.username.toLowerCase() === inputValue.toLowerCase()
                }
            })
            setIsFriend(isFind)
            return isFind
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        if(inputValue === "") filteredFun(loggedInUser.friends)
        const friend = filteredFriends(inputValue)
        if(isFindFriend() && friend){
            filteredFun([searchedUser._id])
        }
    }

    const handleClickToAddFriend = () => {
        if(isFindFriend() == undefined){
            const user = filteredUser()
            addFriend(user)
        }
    }

return(
    <div className="search">
        <Autocomplete
            freeSolo
            disableClearable
            options={users.map(user => user.username)}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search username"
                    InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    }}
                />
              )}
        />
        <div className="right">
            <button onClick={handleSubmit}>Search</button>
            <button onClick={handleClickToAddFriend}>Add Friend</button>
        </div>
    </div>
)

}

export default Search;