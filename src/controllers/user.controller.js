import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiErrors.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from"../utils/cloudnary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(
    
    async(req, res)=>{
    // get user details from frontend
    // validation - not empty
    // check user is exist
    // check for images , check for avatar
    // upload them to cloudnary , avatar
    // create user object - create entery in db
    // remove password and refresh token field from response 
    // check for user creation
    // return res
    console.log("2291=>",req.body);

    const {fullName , email , username , password }=req.body
    console.log("email", email)
    console.log("fullName", fullName)
    console.log("username", username)
    console.log("password", password)

    if([fullName, email , username , password].some((field)=> field?.trim()=== ""))
    {
        throw new ApiError(400, "fields is required")
    }

    const existed_user = User.findOne({

        $or: [{username},{email}]
    })

    if(existed_user)
    {
        throw new ApiError(409, "user already exist")
    }

    console.log("2292=>", req.files)
    
    const avatarLocalPath= req.files?.avatar[0]?.path;
    const coverImageLocalPath= req.files?.coverImage[0]?.path;

    if(!avatarLocalPath)
    {
        throw new ApiError(400 , "avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar)
    {
        throw new ApiError(400 , "avatar is required")
    }

    const user= await User.create({
        fullName,
        email,
        username : username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    console.log("2293=>", user)

    const createuser = await User.findById(user.id).select(
        "-password -refreshToken"
    )

    console.log("2294=>", createuser)

    if(!createuser) {
        throw new ApiError(500, "something went wrong while creating user")

    }

    return res.status(200).json(new ApiResponse(200, createuser, "user created sucessfiully"));

})





export {registerUser}