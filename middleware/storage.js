const multer = require("multer");

const guardar = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function(req, file, cb) {
    if (file) {
      const ext = file.originalname.split('.').pop();
      cb(null, Date.now() + '.' + ext);
    }
  }
});

const filtro = function(req, file, cb) {
  if (file && (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const subirImagen = multer({ storage: guardar, fileFilter: filtro });

module.exports = subirImagen;