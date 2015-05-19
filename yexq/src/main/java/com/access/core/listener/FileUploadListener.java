package com.access.core.listener;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.ProgressListener;

import com.access.action.resource.State;

public class FileUploadListener implements ProgressListener {
	private HttpSession session;
	public FileUploadListener(HttpServletRequest request) {
		session = request.getSession();
		State state = new State();
		session.setAttribute("state", state);
	}

	/**
	 * 
	 */
	public FileUploadListener() {//该方法很重要，否则tomcat启动会报错
		super();
	}
	
	public void update(long readedBytes, long totalBytes, int currentItem) {
	
		System.out.println("update:" + readedBytes + ";" + totalBytes + ";" 
		+ (int)(((float)readedBytes/(float) totalBytes)*100) + ";" + currentItem);
		State state = (State) session.getAttribute("state");
		state.setReadedBytes(readedBytes);
		state.setTotalBytes(totalBytes);
		state.setCurrentItem(currentItem);
	}
}

