package com.access.core.listener;

import java.io.File;
import java.io.FileInputStream;
import java.util.Properties;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.access.core.util.PropertiesUtil;

public class TwifiListener implements ServletContextListener {

	public void contextInitialized(ServletContextEvent event) {
		try{
			PropertiesUtil.confProperties = new Properties();
			String path = (getClass().getClassLoader().getResource("").toURI()).getPath();
			
			File rootDirectory = new File(path);
	
	        File[] propertiesFiles = rootDirectory.listFiles(new FileNameSelector("properties"));
			
			for(File file : propertiesFiles){
				FileInputStream fis = new FileInputStream(file);
				PropertiesUtil.confProperties.load(fis);
			}
//			ServletActionContext.getPageContext().getPage();
//			ServletActionContext.getPageContext().getRequest().setAttribute("test", "AAAAA");
		
		}catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void contextDestroyed(ServletContextEvent sce) {
		// TODO Auto-generated method stub
		
	}

}
