const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');

app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST'],
}));

const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/convertVideo', upload.single('file'), (req, res) => {

  if (!req.file) {
    return res.status(400).send('未上傳文件');
  }

  const inputBuffer = req.file.buffer;
  const inputFileName = 'input.webm';
  const outputFileName = 'output.mp4';
  DeleteExistsFile(path.join(__dirname, inputFileName))
  DeleteExistsFile(path.join(__dirname, outputFileName))

  fs.writeFileSync(inputFileName, inputBuffer);
  const ffmpegCommand = `ffmpeg -i ${inputFileName}  -c:v libx264 -c:a aac -strict experimental ${outputFileName}`; // cmd 指令
  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`FFmpeg error: ${error}`);
      return res.status(500).send('Conversion failed.');
    }

    return res.status(200).send('成功轉換檔案');
  });

});


app.get('/getVideo', (req, res) => {

  const outputFileName = 'output.mp4'

  try {
    const outputFilePath = path.join(__dirname, outputFileName);
    console.log("路徑 : " + outputFilePath)
    res.sendFile(outputFilePath, (err) => {
      if (err) {
        console.error("獲取失敗" + err);
        res.status(500).send('Error sending video');
      }
      console.log('獲取成功')
    });
  } catch (error) {
    console.log("getVideo error : " + error)
    return res.status(400).send(error);
  }
});

const DeleteExistsFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

const io = require('socket.io')(http, {
  cors: true,
})

io.on('connection', (socket) => {
  // 加入房間
  socket.on('join', (room) => {
    socket.join(room)
    console.log("join : " + room)
    socket.to(room).emit('ready', '準備通話')
    console.log(socket.id)
  })

  // 離開房間
  socket.on('leave', (room) => {
    console.log('leave: ' + room)
    socket.leave(room);
    socket.to(room).emit('bye')
    socket.emit('leaved')
  })

  // 轉傳 Offer
  socket.on('offer', (room, desc) => {
    console.log("offer : " + desc)
    socket.to(room).emit('offer', desc)
  })

  // 轉傳 Answer
  socket.on('answer', (room, desc) => {
    console.log("answer : " + desc)
    socket.to(room).emit('answer', desc)
  })

  // 交換 ice candidate
  socket.on('ice_candidate', (room, data) => {
    console.log("ice_candidate : " + data)
    socket.to(room).emit('ice_candidate', data)
  })

  // 錯誤處理
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  // 日志記錄
  socket.on('log', (message) => {
    console.log('Socket log:', message);
  });

})

http.listen(8080, () => {
  console.log(`Server running in 8080`)
})

