export default{
  data(){
    return{

    }
  },
  methods:{
    showError(error){
      this.$createDialog({
        type:"alert",
        title:"请求异常",
        content:error.toString(),
        icon: 'cubeic-warn'
      }).show()
    },
    showToast(msg){
      const _toast  = this.$createToast({
        txt:msg,
        type: 'txt'
      });
      _toast.show();
    },
    async $request(fn){
      const _toast  = this.$createToast({
        time:0,
        txt:"加载中...",
        mask:true
      });
      _toast.show();
      try{
        let result = await fn();
        _toast.hide();
        return result;
      }catch (e){
        this.showError(e);
        _toast.hide();
        return JSON.parse(e);
      }
    }
  },
}
