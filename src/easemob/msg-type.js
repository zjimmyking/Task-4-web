const msgType = {
    read: {
        value: 'read'
    },
    txt: {
        value: 'txt'
    },
    img: {
        value: 'img',
        desc: '[图片]',
        fileTypes: ['.jpg', '.jpeg', '.png', '.gif']
    },
    audio: {
        value: 'audio',
        desc: '[语音]',
        fileTypes: ['.mp3', '.amr', '.wmv']
    },
    video: {
        value: 'video',
        desc: '[视频]',
        fileTypes: ['.mp4', '.avi', '.rmvb', '.mkv']
    },
    file: {
        value: 'file',
        desc: '[文件]'
    }
};
export default msgType;
