import React from 'react'
import {useState, useEffect} from 'react'
import {
    InputLabel,
    MenuItem,
    FormHelperText,
    FormControl,
    Grid,
  } from "@mui/material";
  import Select from "@mui/material/Select";
  import { getAllUser } from '../../redux/actions';
  import { Dispatch } from "redux";
  import { useDispatch, useSelector } from "react-redux/es/exports";

const User = () => {
    const dispatch = useDispatch<Dispatch<any>>();  
    const user: any = useSelector<any>((state) => state.users);
    const [users, setUsers] = useState(0)
    
    const handleChange = (e: any) =>{
        setUsers(e.target.value)
        sessionStorage.setItem("userId", e.target.value)
    }

    
    useEffect(() => {
      setUsers(Number(sessionStorage.getItem("userId") ?? 0))
    }, []);

    useEffect(() => {
        dispatch(getAllUser());
      }, [dispatch]);

  return (
    <div>
          <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
        <FormControl sx={{ mb: 2 }} fullWidth>
            <InputLabel id="demo-simple-select-error-label">
              User:{" "}
            </InputLabel>
            <Select
              labelId="demo-simple-select-error-label"
              id="users"
              value={users}
              label="users:"
              name="users"
              onChange={handleChange}
            >
              <MenuItem value={0} key={0}>
                {<em>None</em>}
              </MenuItem>
              {user.map((e: { id: number; userName: string }) => (
                <MenuItem value={e.id} key={e.id}>
                  {e.userName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText style={{ display: "none" }}>Error</FormHelperText>
          </FormControl>
          </Grid>
    </div>
  )
}

export default User