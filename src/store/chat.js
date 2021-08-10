const chat = {
    state: {
        // 连接成功标识
        isConnSuccess: false,
        // 所有消息 username:msgList
        msgList: {},

    },
    mutations: {
        SET_MSG: (state, data) => {
            state.msgList.push(data)
        },

    },
    actions: {
        setMsg({
            commit
        }, data) {
            commit('SET_MSG', data)
        }
    }
};

export default chat;