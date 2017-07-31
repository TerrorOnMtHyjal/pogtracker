import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReplaySchema = new Schema({
  videoID : {
    type : Number,
    required : true
  },
  channelData : {
    name : String,
    displayName : String,
    api: String,
    logo: String
  },
  replayData : {
    title : String,
    url : String,
    length : Number,
    recordedAt : String,
    game : String
  },
  library : [{
    name : String,
    imgID : Number,
    channelEmote : Boolean,
    moments : [Number]
  }]
});

export default mongoose.model('Replay', ReplaySchema);
