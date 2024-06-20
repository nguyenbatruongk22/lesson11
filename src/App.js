import { useEffect, useState } from 'react';
import './App.css';
import NBTCategory from './Component/NBTCategory';
import axios from "./API/NBTAPI";
import NBTCategoryForm from './Component/NBTCategoryForm';


function NBTApp() {
  // lấy dữ liệu từ api
  const [NBTCategories, setNBTCategories] = useState([]);

  const getCategories = async () => {
    try {
      const NBTCateResponse = await axios.get("NBTCategory");
      setNBTCategories(NBTCateResponse.data);
    } catch (error) {
      console.log("lỗi:", error);
    }
  }

  useEffect(() => {
    getCategories();
    console.log("NBTCategories:", NBTCategories);
  }, [])

  //trạng thái form
  const [NBTCategoryIsForm, setNBTCategoryIsForm] = useState(false);
  //dữ liệu form : Add/Edit
  let NBTCategoryInit = {
    NBTId: 0,
    NBTCategoryName: "",
    NBTCategoryStatus: true,
}
  const [NBTCategoryEdit, setNBTCategoryEdit] = useState(NBTCategoryInit);
  const NBTHandleAddNew = (param) => {
    setNBTCategoryIsForm(param);
  }
  const NBTHandleCategoryCloseForm = (param) => {
    setNBTCategoryIsForm(param);
  }
  const NBTHandleCategorySubmit = (param) => {
    let id = NBTCategories[NBTCategories.length - 1].NBTId;
    console.log("Mã:", id);
    param.NBTId = id + 1;
    NBTCategories.push(param);
    setNBTCategories((prev) => {
      return [...prev];
    })
    setNBTCategoryIsForm(false);
  }
  //hàm xử lý sự kiện xóa
  const NBThandleDelete = (NBTId)=>{
    console.log("App-Delete-NBTId:",NBTId);
    // const NBTResponse = axios.delete(`https://666c2e2e49dbc5d7145cfd4f.mockapi.io/NBTapi/NBTv1/NBTCategory/${NBTId}`);
    const NBTResponse = axios.delete(`NBTCategory/${NBTId}`);
    console.log("NBTResponse-Delete",NBTResponse);
    let NBTdelete = NBTCategories.filter(x=>x.NBTId !== NBTId);
    setNBTCategories(NBTdelete);
    console.log("Deleted:",NBTdelete);
  }
  const NBThandleEdit =(NBTCategory)=>{
    setNBTCategoryEdit(NBTCategory);
    setNBTCategoryIsForm(true);
  }
  return (
    <div className="container border my-3">
      <h1>Nguyễn Bá Trường - Call API</h1>

      <NBTCategory renderNBTCategories={NBTCategories}
        onAddNew={NBTHandleAddNew}
        onNBTDelete={NBThandleDelete} 
        onNBTEdit={NBThandleEdit}/>
      <hr />
      {
        NBTCategoryIsForm === true ? <NBTCategoryForm
          renderNBTCategory = {NBTCategoryEdit}
          oncloseForm={NBTHandleCategoryCloseForm}
          onCategorySubmit={NBTHandleCategorySubmit} /> : ""
      }

    </div>
  );
}
export default NBTApp;