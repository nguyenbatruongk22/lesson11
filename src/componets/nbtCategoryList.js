import React from 'react'

export default function NBTCategory({ renderNBTCategories, onAddNew, onNBTDelete, onNBTEdit }) {
    console.log("renderNBTCategories: ", renderNBTCategories);
    let NBTCategoriesElement = renderNBTCategories.map((NBTCategory, index) => {
        return (
            <tr key={index}>
                <th>{index + 1}</th>
                <td>{NBTCategory.NBTId}</td>
                <td>{NBTCategory.NBTCategoryName}</td>
                <td>{NBTCategory.NBTCategoryStatus === true ? "Hiển Thị" : "Tạm Khóa"}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => NBThandleDelete(NBTCategory.NBTId)}>Delete</button>
                    <button className='btn btn-success' onClick={() => NBThandleEdit(NBTCategory)}>Edit</button>
                </td>
            </tr>
        )
    })
    const NBThandleDelete = (NBTId) => {
        if (window.confirm('Bạn Có Muốn Xóa ['+NBTId+'] Không?')) {
            console.log("Delete:", NBTId);
            onNBTDelete(NBTId);
        } else {

        }
    }
    const NBThandleEdit = (NBTCategory)=>{
        onNBTEdit(NBTCategory);
    }

    const NBTHandleAdd = () => {
        onAddNew(true);
    }
    return (
        <div className='container m-2'>
            <h2>Danh Sách Loại Sản Phẩm</h2>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã Loại</th>
                        <th>Tên Loại</th>
                        <th>Trạng Thái</th>
                        <th>Chức Năng</th>
                    </tr>
                </thead>
                <tbody>
                    {NBTCategoriesElement}
                </tbody>
            </table>
            <button className='btn btn-primary' onClick={NBTHandleAdd}>Thêm Mới</button>
        </div>
    )
}