const userModel = require("../Models/user.Model");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../Models/blacklistToken.model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/auth.utils");
const jwt = require("jsonwebtoken");
module.exports.registerUser = async (req, res, next) => {
  console.log(req.body)
  try {
    const { firstname, lastname, email, password, phoneNumber, authProvider } =
      req.body;

    
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "user already exist" });
    }
    hashedPassword = undefined;
    if (authProvider === "local" && password) {
      hashedPassword = await userModel.hashPassword(password);
    }

    const user = await userService.createUser({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phoneNumber,
      authProvider,
    });
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken, user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.authProvider == "local") {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Password incorrect" });
      }
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("Set-Cookie Header:", res.getHeaders()["set-cookie"]);
    res.status(200).json({ accessToken, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
// module.exports.forgotPassword=async (req,res,next)=>{
//     const{email,privateKey,newpassword,confirmpassword}=req.body;
//     const user=await userModel.findOne({email});
//     if(!user){
//         return res.status(404).json({message:'email does not match'})
//     }
//     // console.log(user)
//     const isMatch=await user.compareKey(privateKey);
//     if(!isMatch){
//         return res.status(400).json({message:'key  does not match'})
//     }
//     if(newpassword!==confirmpassword){
//         return res.status(400).json({message:'Password do not match'})
//     }
//     const hashedPassword=await userModel.hashPassword(newpassword);
//     await userModel.findByIdAndUpdate(user._id,{password:hashedPassword});
//     return res.status(200).json({message:'Password reset successful'})
// }

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
};

module.exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    

    if (!refreshToken) {
      return res.status(403).json({ message: "refresh token not found" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }
        const user = await userModel.findById(decoded.id);
        if (!user) {
          return res.status(403).json({ message: "User not found" });
        }
        const newAccessToken = generateAccessToken(user);
        res.status(200).json({ accessToken: newAccessToken });
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({message:'internal server error'})
  }
};
