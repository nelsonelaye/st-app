export const convertArray = (arr) => {
    return arr?.map((item) => {
        return{
            "label" : item?.name,
            "value" : item?.id
        }
    })
}
export const convertStore = (arr) => {
    return arr?.map((item) => {
        return{
            "label" : item?.storeName,
            "value" : item?.storeId
        }
    })
}

export const convertUserList = (arr) => {
    let list = []
    arr?.map((item) => {
        list.push(item.name)
    })
    return list
}

export const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];

