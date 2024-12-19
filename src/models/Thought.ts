import { Schema, model, Document, Types } from "mongoose";

// Interface representing a Reaction document
interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// Interface representing a Thought document
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
  reactionCount: number;
}

// Reaction Schema
const ReactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp.toISOString(),
    },
  },
  {
    toJSON: {
      getters: true, // Enable getters in JSON output
    },
    id: false, // Disable the virtual id field
  }
);

// Thought Schema
const ThoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp.toISOString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true, // Enable virtual fields in JSON output
      getters: true, // Enable getters in JSON output
    },
    toObject: {
      virtuals: true, // Enable virtual fields in object output
    },
    id: false, // Disable the virtual id field
  }
);

// Virtual for reactionCount
ThoughtSchema.virtual("reactionCount").get(function (this: IThought) {
  return this.reactions.length;
});

// Create and export the Thought model
const Thought = model<IThought>("Thought", ThoughtSchema);
export default Thought;
