package com.access.core.error;

import com.access.core.util.FilePath;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * 系统错误信息实现类
 * @author liuhualuo
 */
public class ErrorMessage {
    private static Properties msgProp;
    private static String MSG_FILE_PATH = "errormsg.properties";

    /**
     * 载入配置文件
     */
    private static void loadMsgProp(){
        if(msgProp != null){
            return ;
        }
        try {
            msgProp = new Properties();
            msgProp.load(new FileInputStream(FilePath.getAbsolutePathWithClass() + "/" + MSG_FILE_PATH));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取错误消息
     * @param key
     * @return
     */
    public static String getErrorMsg(String key){
        loadMsgProp();
        return msgProp.get(key).toString();
    }

    /**
     * 获取错误码
     * @param key
     * @return
     */
    public static String getErrorMsgCode(String key){
        loadMsgProp();
        return msgProp.get(key + ".code").toString();
    }

}
