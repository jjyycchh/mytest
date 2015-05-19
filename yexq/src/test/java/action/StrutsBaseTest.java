package action;

import java.util.HashMap;
import java.util.Map;

import org.apache.struts2.StrutsSpringTestCase;
import org.apache.struts2.dispatcher.Dispatcher;

public class StrutsBaseTest extends StrutsSpringTestCase{
	
	@Override
	public String[] getContextLocations() { // 返回你项目中spring配置文件所在的目录
		return new String[]{"classpath:applicationContext.xml"};
	}
	
    @Override
    protected void setUp() throws Exception {
        super.setUp();
    }
    
	@Override
	protected Dispatcher initDispatcher(Map<String, String> params) {
		if (params == null){
			params = new HashMap<String, String>();
		}
		params.put("config", "struts-default.xml,struts-plugin.xml,struts.xml");
//		params.put("struts.convention.result.path", "/WEB-INF/template");// 当然这里可以需要也可以不要，看你的具体情况
		return super.initDispatcher(params);
	}

	@Override
	protected void injectStrutsDependencies(Object object) {
		super.injectStrutsDependencies(object);
	}

	@Override
	protected void initServletMockObjects() {
		resourceLoader = new MyResourceLoader();
		super.initServletMockObjects();
	}
	
}
