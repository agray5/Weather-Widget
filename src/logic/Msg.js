class Msg {
  constructor(msg, isError = false){
    this.msg = msg;
    this.isError = isError;
  }
}

export default Msg
