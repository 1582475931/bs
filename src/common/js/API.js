const btnUrl = "/api"
// const btnUrl=""
const login = btnUrl + "/login"

//管理员
const findManage = btnUrl + "/findManage";
const deleteManag = btnUrl + "/deleteManag"
const updatedManag = btnUrl + "/updatedManag"
const addManage = btnUrl + "/addManage"
const upManag = btnUrl + "/upManag"
const changePassManage = btnUrl + '/changePassManage'

//banner
const addBanner = btnUrl + "/addBanner"
const findBanner = btnUrl + "/findBanner"
const delBanner = btnUrl + "/delBanner"
const updatedBanner = btnUrl + "/updatedBanner"

//店铺管理员
const findUseradmin = btnUrl + "/findUseradmin"
const addUseradmin = btnUrl + "/addUseradmin"
const deleteUseradmin = btnUrl + '/deleteUseradmin'
const updatedUseradmin = btnUrl + '/updatedUseradmin'
const udUseradmin = btnUrl + '/udUseradmin'
//修改密码
const changePassUseradmin = btnUrl + '/changePassUseradmin'
//商品
const findWares = btnUrl + '/findWares'
const addWares = btnUrl + '/addWares'
const deleteWares = btnUrl + '/deleteWares'
const updatedWare = btnUrl + '/updatedWare'
const finWares = btnUrl + '/finWares'

//评论
const findComment = btnUrl + '/findComment'
const deleteComment = btnUrl + '/deleteComment'

//用户
const findUser = btnUrl + '/findUser'
const deleteUser = btnUrl + '/deleteUser'

//类型
const addNav = btnUrl + '/addNav'
const delNav = btnUrl + '/delNav'
const findNav = btnUrl + '/findNav'
const updatedNav = btnUrl + '/updatedNav'

//用户收藏管理
const  findCollection=btnUrl+'/findCollection'
const delCollection=btnUrl+'/delCollection'

// 用户订单管理
const findBuy=btnUrl+'/findBuy'
const delBuy=btnUrl+'/delBuy'

//用户加入购物车
const findCart=btnUrl+'/findCart'
const  delCart=btnUrl+'/delCart'

//用户收货地址
const findAddress=btnUrl+'/findAddress'
const delAddress=btnUrl+'/delAddress'

//商品点赞管理
const findpoint=btnUrl+'/findpoint'
const delPoint=btnUrl+'/delPoint'
//退出登录
const exit = btnUrl + '/exit'
export default {
    login,
    findAddress,
    delAddress,
    findpoint,
    delPoint,
    findCart,
    delCart,
    findManage,
    findBuy,
    delBuy,
    findCollection,
    delCollection,
    deleteManag,
    updatedManag,
    addManage,
    upManag,
    changePassManage,

    addBanner,
    findBanner,
    delBanner,
    updatedBanner,

    findUseradmin,
    addUseradmin,
    deleteUseradmin,
    updatedUseradmin,
    changePassUseradmin,
    udUseradmin,

    findWares,
    addWares,
    deleteWares,
    updatedWare,
    finWares,

    findComment,
    deleteComment,

    findUser,
    deleteUser,

    addNav,
    delNav,
    findNav,
    updatedNav,
    
    exit

}