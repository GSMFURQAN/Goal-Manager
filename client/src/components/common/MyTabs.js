import React, { useEffect, useMemo, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  Divider,
  Badge,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MyList from "../ListGoals/MyList";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { selectView } from "../../redux/generalSlice";
import { deleteManyTodo, getPreferences, savePreferences, updateMany } from "../../Apis/Apis";
import { selectTab } from "../../redux/tabSlice";
import { fetchData } from "../../redux/goalSlice";

const EditableTabs = () => {
  const dispatch = useDispatch();
  const {category} = useSelector((state)=>state.tab)
  const [tabs, setTabs] = useState([]);
  const [value, setValue] = useState();
  const general = useSelector((state) => state.general);
  const { data, loading, error } = useSelector((state) => state.goal);
  let account = JSON.parse(sessionStorage.getItem("account"));
  
  async function upliftCategory (id, label) {
     dispatch( await selectTab({id,label}))
   }


  const handlex = (e,id) => {
    setValue(id)
    upliftCategory(tabs[id]?.id, tabs[id]?.label);
};

useEffect(()=>{
  if(tabs && category.id){
    setValue(tabs?.findIndex((x)=>x?.id == category?.id))
  }
},[tabs, category ])

useEffect( () => {
    getPreferences(account?.userId).then((res)=>{
        let categories = res?.data[0]?.categories.sort((a,b)=>a.id-b.id)
        setTabs(categories);
        //   categories.length >0 &&  upliftCategory(categories[value]?.id, categories[value]?.label)
      })
    }, []);

  const handleEdit = async (id) => {
    const newLabel = prompt("Enter new tab label:");
    const oldValue = tabs.filter((x) => x.id == id)[0]?.label;
    if (newLabel) {
      setTabs(
        tabs.map((tab) => (tab.id === id ? { ...tab, label: newLabel } : tab))
      );
      await updateMany({ oldValue: oldValue, newValue: newLabel });
    }
  };

  const handleDelete = async (label) => {
    let newTabs = tabs.filter((tab) => tab.label !== label)
    await deleteManyTodo(label.toString());
    await savePreferences({userId: account?.userId, categories: newTabs})
    setTabs(newTabs);
    if(tabs.length <=1){
        upliftCategory(tabs[0]?.id, tabs[0]?.value);
    }

    // dispatch(fetchData({ dayView: general?.dayView}));

    // if (tabs.length == 1) {
    //   upliftCategory(tabs[0].id, tabs[0].label);
    // }
  };

  const addTab = () => {
    const newLabel = prompt("Enter new tab label:");
    if (newLabel) {
      const newId = tabs.length > 0 ? Math.max(...tabs.map((x)=>+x.id)) + 1 :1
      const newTabs = [...tabs, { id: newId, label: newLabel }]
      setTabs(newTabs);
      setValue(newId);
      savePreferences({userId: account?.userId, categories: newTabs})
      upliftCategory(newId, newLabel);
    }
  };
  return (
    <Box minWidth={"55%"}>
      <Tabs
        value={value}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        onChange={handlex}
      >
        {tabs?.map((tab, index) => (
          <Tab
            key={tab?.id}
            // onClick={() => handlex(tab.id)}
            label={
              <Stack display="flex" direction={"row"} spacing={2}>
                <Typography
                  style={{ textTransform: "capitalize" }}
                  fontSize={"small"}
                ><Badge badgeContent={data?.filter((x)=>x?.category?.id == tab?.id).length} color="primary">
                  {tab?.label}&nbsp;&nbsp;&nbsp;    
              </Badge>
                </Typography>
                <Box
                  sx={{
                    display: category?.id == tab?.id ? "flex" : "none",
                  }}
                >
                  <EditIcon
                    sx={{ mx: "9px" }}
                    onClick={() => handleEdit(tab?.id)}
                    fontSize={"small"}
                  />
                  <DeleteIcon
                    onClick={() => handleDelete(tab?.label)}
                    fontSize={"small"}
                  />
                </Box>
              </Stack>
            }
          />
        ))}
        {tabs.length < 4 && (
          <IconButton sx={{ mx: "12px", color: "inherit" }} onClick={addTab}>
            <AddIcon />
          </IconButton>
        )}
        <Divider />
      </Tabs>
      <MyList />
    </Box>
  );
};

export default EditableTabs;
