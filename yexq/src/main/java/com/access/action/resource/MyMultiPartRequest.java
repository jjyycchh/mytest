package com.access.action.resource;

import com.opensymphony.xwork2.util.logging.Logger;
import com.opensymphony.xwork2.util.logging.LoggerFactory;

import javax.servlet.http.HttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.util.Enumeration;
import java.util.List;

import org.apache.struts2.dispatcher.multipart.MultiPartRequest;

public class MyMultiPartRequest implements MultiPartRequest{
    static final Logger LOG = LoggerFactory.getLogger(MultiPartRequest.class);

	@Override
	public void parse(HttpServletRequest request, String saveDir)
			throws IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Enumeration<String> getFileParameterNames() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String[] getContentType(String fieldName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public File[] getFile(String fieldName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String[] getFileNames(String fieldName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String[] getFilesystemName(String fieldName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getParameter(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Enumeration<String> getParameterNames() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String[] getParameterValues(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> getErrors() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void cleanUp() {
		// TODO Auto-generated method stub
		
	}
}

