package com.access.base;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;
import com.github.miemiedev.mybatis.paginator.domain.Order;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.access.core.commons.Page;

@Repository(value="baseDao")
public class BaseDao extends SqlSessionDaoSupport {
	@Resource
	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory){
		super.setSqlSessionFactory(sqlSessionFactory);
	}
	
    public boolean delete(String deleteId,Integer id) {  
        try {
        	 getSqlSession().delete(deleteId, id);  
            return true;  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return false;  
    }  
 
    public List getAll(String selectId) {  
        List list = null;  
        try {
            list = getSqlSession().selectList(selectId);  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return list;  
    }  
 
    public boolean insert(String insertId, Object object) {  
        try {  
        	getSqlSession().insert(insertId, object);  
            return true;  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return false;  
    }  
 
    public boolean update(String updateId, Object obj) {  
        try {  
        	getSqlSession().update(updateId, obj);  
            return true;  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return false;  
    }

	public Object getById(String selectId, Object object) {
		return getSqlSession().selectOne(selectId, object);
	}

	public Object getById(String selectId, Integer id) {
		return getSqlSession().selectOne(selectId, id);
	}

	public int countAll(String selectId) {
		return getSqlSession().selectOne(selectId);
	}
	
	/**
	 * 修改外键约束
	 * @param status
	 */
	public void updateForeignKeyChecks(Integer status){
		try {  
        	getSqlSession().update("updateForeignKeyChecks", status);
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
	}
	
	/**
	 * 面向pojo的分页
	 * @param selectId
	 * @param page
	 * @param param
	 * @param orderString
	 * @return
	 */
	@Deprecated
	@SuppressWarnings("unchecked")
	public Page findPaging (String selectId, Page page, Object param, String orderString){
	    PageBounds pageBounds;
	    if(StringUtils.isBlank(orderString)){
	    	pageBounds = new PageBounds(page.getPageNo(), page.getPageSize());
	    }else{
	    	pageBounds = new PageBounds(page.getPageNo(), page.getPageSize() , Order.formString(orderString));
	    }
	    List list = getSqlSession().selectList(selectId, param, pageBounds);
	    //获得结果集条总数
	    PageList pageList = (PageList)list;
	    page.setTotalRecord(pageList.getPaginator().getTotalCount());
	    page.setRecords(list);
	    return page;
	}
	
	/**
	 * 面向map的分页
	 * @param selectId
	 * @param params
	 * @return
	 */
	@Deprecated
	@SuppressWarnings("unchecked")
	public Page findPaging (String selectId, Map<String, Object> params){
	    Page page = (Page) params.get("page");
	    String orderString = (String) params.get("orderString");
	    PageBounds pageBounds;
	    if(StringUtils.isBlank(orderString)){
	    	pageBounds = new PageBounds(page.getPageNo(), page.getPageSize());
	    }else{
	    	pageBounds = new PageBounds(page.getPageNo(), page.getPageSize(), Order.formString(orderString));
	    }
	    List list = getSqlSession().selectList(selectId, params, pageBounds);
	    //获得结果集条总数
	    PageList pageList = (PageList)list;
	    page.setTotalRecord(pageList.getPaginator().getTotalCount());
	    page.setRecords(list);
	    System.out.println("totalCount: " + pageList.getPaginator().getTotalCount());
	    return page;
	}
	
	
	/**
	 * 获取分页数据列表
	 * @param selectId
	 * @param params
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Page findPageList (String selectId, Map<String, Object> params){
	    Page page = (Page) params.get("page");
	    List list = getSqlSession().selectList(selectId, params);
	    
	    page.setRecords(list);
	    return page;
	}
	
	/**
	 * 获取分页信息
	 * @param selectId
	 * @param params
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Page findPageInfo (String selectId, Map<String, Object> params){
	    Page page = (Page) params.get("page");
	    
	    //获得结果集条总数
	    int totalRecord = getSqlSession().selectOne(selectId+"Count", params);
	    page.setTotalRecord(totalRecord);
	    
	    System.out.println("totalCount: " + totalRecord);
	    return page;
	}
	
}
