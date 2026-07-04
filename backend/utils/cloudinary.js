import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const isPlaceholder = !process.env.CLOUD_NAME || process.env.CLOUD_NAME === "your_cloudinary_cloud_name";

if (!isPlaceholder) {
    cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET
    });
} else {
    // Mock the uploader if credentials are not provided so the app doesn't crash
    cloudinary.uploader = {
        upload: async () => ({
            secure_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=mock"
        })
    };
}
export default cloudinary;