import { Schema, model, Document } from "mongoose";
import { IThought } from "./Thought";

interface IUser extends Document {
  username: string;
  email: string;
  thoughts?: IThought[];
  friends?: string;
}

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: {
      type: String,
      trim: true,
      required: false,
    },
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//
// Virtual for friendCount
// userSchema.virtual("friendCount").get(function (this: IUser) {
//   return this.friends.length;
// });

// Initialize the User model
const User = model("User", userSchema);

export default User;
