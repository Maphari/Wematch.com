const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "Username must be unique"],
    min: [6, "minimum of 6 characters required"],
    validate: {
      validator: (value) => {
        return /^[a-zA-Z0-9]+$/.test(value);
      },
      message: "Only letters and numbers allowed",
    },
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: [true, "Email must be unique"],
    validate: {
      validator: (value) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: "Provide a valid email",
    },
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["male", "female", "non-binary"],
  },
  mobile_number: {
    type: Number,
    required: [true, "Mobile number is required"],
    unique: [true, "Mobile number already taken"],
    match: /^[+]\d{1,3}\s?\d{10}$/,
    validate: {
      validator: (value) => {
        return /^[+]\d{1,3}\s?\d{10}$/.test(value);
      },
      message: "Provide valid mobile number",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: (value) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
      },
      message: "At least 8 characters required",
    },
  },
  dateCreated: Date,
});

const more_info_schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  profile_picture: {
    type: String,
    required: [true, "Profile required for verification"],
    validate: {
      validator: (picture) => {
        return (
          /^.*\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/i.test(picture) &&
          picture.length < 2000000
        );
      },
      message:
        "Picture must be a valid image file (JPEG, PNG, or GIF) and be less than 2MB",
    },
  },
  date_of_birth: {
    type: Date,
    required: [true, "Date of birth required"],
    validate: {
      validator: (date) => {
        return date instanceof Date && date < new Date();
      },
      message: "Date of birth must be a valid date and before the current date",
    },
  },
  bio: {
    type: String,
    validate: {
      validator: (bio) => {
        return bio.length <= 500;
      },
      message: "Bio must be less than or equal to 500 characters",
    },
  },
});

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hashed) => {
      if (err) {
        return next(err);
      }

      user.password = hashed;
      next();
    });
  });
});

// COMPARING HASHED PASSWORD
userSchema.method.comparePassword = function (comparedPassword) {
  const user = this;

  return new Promise((ressoled, rejected) => {
    bcrypt.compare(comparedPassword, user.password, (err, ismatch) => {
      if (err) {
        return rejected(err);
      }
      if (!ismatch) {
        return rejected(false);
      }
      ressoled(true);
    });
  });
};

mongoose.model("User", userSchema);
// mongoose.model("Info", more_info_schema)
