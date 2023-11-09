const getters = {
  dialogVisible: state => state.global.dialogVisible,
  dialogAiVisible: state => state.global.dialogAiVisible,
  offlineSideBar: state => state.global.offlineSideBar,
  showVerityBox: state => state.global.showVerityBox,
  intelData: state => state.global.intelDate,
  country_code: state => state.global.country_code,
  showEditPaw: state => state.global.showEditPaw
}
export default getters
