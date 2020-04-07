文章出处: https://segmentfault.com/a/1190000016022356 

利用antd的Upload组件



```kotlin
onFilebeforeUpload = (file) => {
    let fileContent = null;
    const isP12 = file.type === 'application/x-pkcs12';
    const { password } = this.state;
    if (!isP12) {
      message.error('您上传的不是.p12格式文件！');
    }
    const isLt40KB = file.size < 40960;
    if (!isLt40KB) {
      message.error('您上传的证书文件超过40K，请重新确认文件大小！');
    }
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = () => {
      fileContent = fr.result;
      if (isP12 && isLt40KB) {
        if (password) {
          this.setState({
            ...this.state,
            ...{
              btnCert: false,
              fileList: [file],
              fileContent,
            },
          });
        } else {
          this.setState({
            ...this.state,
            ...{
              fileList: [file],
              fileContent,
              btnCert: true,
              modelCert: {
                items: this.initItemsCert(false),
              },
            },
          });
        }
      } else {
        this.setState({
          ...this.state,
          ...{
            fileList: [],
            fileContent: {},
          },
        });
        this.fileContent = {};
      }
    };
    return isP12 && isLt40KB;
  };


render(){
return(

 <Upload
                  name="file"
                    accept="application/x-pkcs12"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    beforeUpload={this.onFilebeforeUpload}
                    onRemove={this.onFileRemove}
                    fileList={fileList}
                  >
                    <Button>
                      <Icon type="upload" /> 选择文件
                    </Button>
                  </Upload>
)

}
```

如果是正常的input的话



```jsx
 onGetFile = (e) => {
    const file = e.target.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(file);
    let fileContent = null;
    fr.onload = () => {
      fileContent = fr.result;
    };
    setTimeout(() => {
      console.log('fileContent', fileContent);
    }, 100);
  };


        <input type="file" onChange={this.onGetFile} />
```