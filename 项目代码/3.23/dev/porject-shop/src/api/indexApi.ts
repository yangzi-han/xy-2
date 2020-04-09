import axios from '../utils/request'

// 登录login
export let getLogin = (mobile: string, password: string) => {
    return axios.post('/auth/loginByMobile', { mobile, password })
}
// 获取用户信息
export let getUserInfo = () => {
    return axios.get('/user/info')
}
// 更新用户头像
export let updateAvatar = (avatar: string) => {
    return axios.post('/user/updateInfo', { avatar })
}
// 上传用户头像
export let uploadAvatar = (form: FormData) => {
    return axios.post('http://123.206.55.50:11000/upload', form)
}
// 首页数据
export let getBanner = () => {
    return axios.get('/')
}
// 首页制造商详情
export let getBrandDetail = (id: string) => {
    return axios.get('/brand/detail', { params: { id } })
}
// 专题数据
export let getTopic = () => {
    return axios.get('/topic/list?page=1&size=100')
}
// 专题详情
export let getDetail = (id: string) => {
    return axios.get('/topic/detail', { params: { id } })
}
// // 相关专题详情 
// export let getDetailRelated = (id: string) => {
//     return axios.get('/topic/related', { params: { id } })
// }
// 分类数据tab
export let getType = () => {
    return axios.get('/catalog/index')
}
// 分类数据list
export let getTypeList = (id: number) => {
    return axios.get('/catalog/current', { params: { id } })
}
// 分类nav-Classify
export let getTypeNav = (id: string) => {
    return axios.get('/goods/category', { params: { id } })
}
// 分类Classify商品数据
export let getClassifyList = (id: string) => {
    return axios.get(`/goods/list?categoryId=${id}&page=1&size=100`)
}
// 分类Classify商品详情
export let getGoodsDetail = (id: string) => {
    return axios.get('/goods/detail', { params: { id } })
}
// 搜索
export let getSearch = () => {
    return axios.get("/search/index")
}
// // 搜索查询--热门搜索
// export let getSearchHot = (keyword: string) => {
//     return axios.get('/search/helper', { params: { keyword } })
// }
// 搜索查询--全部数据
export let getSearchData = (keyword: string) => {
    return axios.get(`/goods/list?keyword=${keyword}&page=1&size=100`)
}
// 添加收藏
export let getAddCollect = (valueId: string) => {
    return axios.post('/collect/addordelete', { valueId, typeId: 0 })
}
// 收藏   
export let getCollectList = () => {
    return axios.get('/collect/list?typeId=0')
}
// 删除收藏
export let getDeleteCollect = (valueId: number) => {
    return axios.post('/collect/addordelete', { valueId, typeId: 0 })
}
// 地址
export let getAddress = () => {
    return axios.get('/address/list')
}
// 新增地址
export let getaddAddress = (name: string, mobile: string,address:string, id: number) => {
    return axios.post('/address/save', { name, mobile,address, id })
}
// 删除地址
export let getdeleteAddress = (id: string) => {
    return axios.post('/address/delete', { id })
}
// 购物车
export let getCart = () => {
    return axios.get('/cart/index')
}
// 新增购物车
export let getAddCart = (goodsId: string, number: string, productId: string) => {
    return axios.post('/cart/add', { goodsId, number, productId })
}
// 删除购物车
export let getDeleteCart = (productIds: string) => {
    return axios.post('/cart/delete', { productIds })
}
// 
export let getCheckedCart = (isChecked: number, productId: string) => {
    return axios.post('/cart/checked', { isChecked, productId })
}