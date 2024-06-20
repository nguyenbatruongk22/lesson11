import React, { useEffect, useState } from 'react'
import axios from "../API/NBTAPI";

export default function NBTCategoryForm({ oncloseForm, onCategorySubmit, renderNBTCategory }) {
    //state 
    const [NBTId, setNBTId] = useState(0);
    const [NBTCategoryName, setNBTCategoryName] = useState("");
    const [NBTCategoryStatus, setNBTCategoryStatus] = useState(true);

    useEffect(() => {
        setNBTId(renderNBTCategory.NBTId);
        setNBTCategoryName(renderNBTCategory.NBTCategoryName);
        setNBTId(renderNBTCategory.NBTCategoryStatus);
    });
    const NBTHandleClose = () => {
        oncloseForm(false);
    }
    const NBTHandleSubmit = async (event) => {
        event.preventDefault();
        if (NBTId === 0) { //thêm
            let NBTCategory = {
                NBTId: 0,
                NBTCategoryName: NBTCategoryName,
                NBTCategoryStatus: NBTCategoryStatus
            }
            await axios.post("NBTCategory", NBTCategory);
            onCategorySubmit(NBTCategory);
        } else {//sửa
            let NBTCategory = {
                NBTId: NBTId,
                NBTCategoryName: NBTCategoryName,
                NBTCategoryStatus: NBTCategoryStatus
            }
            await axios.put("NBTCategory", NBTCategory);
            onCategorySubmit(NBTCategory);
        }
    }
    return (
        <div>
            <form>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Category Name</span>
                    <input type="text" class="form-control" name='NBTCategoryName'
                        value={NBTCategoryName}
                        onChange={(ev) => setNBTCategoryName(ev.target.value)}
                        placeholder="Category Name"
                        aria-label="Category Name" aria-describedby="basic-addon1" />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Category Status</span>
                    <select className='form-control'
                        name='NBTCategoryStatus'
                        value={NBTCategoryStatus}
                        onChange={(ev) => setNBTCategoryStatus(ev.target.value)}>
                        <option value={true}>Hiển Thị</option>
                        <option value={false}>Tạm Khóa</option>
                    </select>
                </div>
                <button className='btn btn-success' onClick={NBTHandleSubmit}>Ghi Lại</button>
                <button className='btn btn-danger' onClick={NBTHandleClose}>Đóng</button>
            </form>
        </div>
    )
}