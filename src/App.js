import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
function App() {
  var file = "";
  useEffect(() => {
    file = document.getElementById('uploadForm');
    file.addEventListener('change', (e) => {

      //
      //  Clear content
      //
      let divPic = document.getElementById('pictureDiv');
      divPic.innerHTML = "";
      let divText = document.getElementById('textDiv');
      divText.innerHTML = "";

      //
      //  Add picture in html
      //
      let img = document.createElement('img');
      img.src = URL.createObjectURL(e.target.files[0]);
      img.id = 'imgFile';
      divPic.append(img);
      console.log(file.value);
      //
      //  Save picture in bucket
      //
      var s = this;
      const data = new FormData(document.getElementById('uploadForm'))
      var imagefile = document.querySelector('#files')
      console.log(imagefile.files[0])
      data.append('file', imagefile.files[0])
      axios.post('https://localhost:7045/api/controller/UploadFile', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        })
    });
    //
    //  btn_confirm -> add img && text
    //
    let btn = document.getElementById('confirmButton');
    btn.addEventListener('click', () => {
      let nameFile = document.getElementById('files').value;
      let masName = nameFile.split('\\');
      console.log(masName[masName.length - 1]);
      axios({
        method: 'get',
        url: `https://localhost:7045/api/controller/RekognitionText?namefile=${masName[masName.length - 1]}`,
        dataType: "dataType",
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        }
      }).then(textResult => {
        console.log(textResult['data']);
        let divText = document.getElementById('textDiv');
        divText.innerHTML = "";
        let resultText = document.createElement('input');
        resultText.id = 'textResult';
        resultText.type = 'text';
        resultText.value = textResult['data'];
        divText.append(resultText);
      });
    });
  });
  return (
    <div>
      <div id='uploadDiv'>
        <form id='uploadForm' name="uploadForm" encType="multipart/form-data">
          <input id="files" name='files' type="file" multiple />
        </form>
        <button id='confirmButton'>Confirm</button>
      </div>
      <div className='mainDiv'>
        <div id='pictureDiv'>
        </div>
        <div id='textDiv'>
        </div>
      </div>
    </div>
  );
}
export default App;
