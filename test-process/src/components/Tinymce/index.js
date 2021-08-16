import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class App extends React.Component {
  handleEditorChange = (content) => {
    console.log('Content was updated:', content);
  };

  render() {
    const editorObj = {
      height: '400px',
      language: 'zh_CN',
      language_url:
        '翻译中文的路径，我尝试很多种方法都不成功，最后叫后台的老哥放进项目的服务器上了，用的线上地址',
      plugins: 'table lists link image preview code',
      toolbar: `formatselect | code | preview | bold italic strikethrough forecolor backcolor | 
      link image | alignleft aligncenter alignright alignjustify  | 
      numlist bullist outdent indent`,
      relative_urls: false,
      file_picker_types: 'image',
      images_upload_url: '上传图片的路径',
      image_advtab: true,
      image_uploadtab: true,
      // images_upload_handler: (blobInfo, success, failure) => {
      //   //这里写你上传图片的方法
      // }
    };
    return (
      <Editor
        inline={false}
        selector="editorStateRef" // 选择器
        // apiKey='官网上申请的key值'
        initialValue={'5252'}
        init={{ ...editorObj }}
        onEditorChange={this.handleEditorChange}
      />
    );
  }
}

export default App;
