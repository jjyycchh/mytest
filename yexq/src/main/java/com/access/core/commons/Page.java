package com.access.core.commons;

import java.util.HashMap;  
import java.util.List;  
import java.util.Map;  
   
/** 
 * 对分页的基本数据进行一个简单的封装 
 */  
public class Page<T> {  
   
    private int pageNo = 1;//页码，默认是第一页  
    private int pageSize = 10;//每页显示的记录数，默认是10  
    private long begin;
    private int totalRecord;//总记录数  
    private int totalPage;//总页数  
    private List<T> records;//对应的当前页记录  
    private Map<String, Object> params = new HashMap<String, Object>();//其他的参数我们把它分装成一个Map对象
    private Boolean gettotal;
    
    public Page() {
		super();
	}
    public Page(int pageNo) {
		super();
		this.pageNo = pageNo;
		this.begin = (this.pageNo-1) * this.pageSize;
	}
    public Page(int pageNo, int pageSize) {
		super();
		this.pageNo = pageNo;
		this.pageSize = pageSize;
		this.begin = (this.pageNo-1) * this.pageSize;
	}
	public int getPageNo() {
       return pageNo;
    }  
    public void setPageNo(int pageNo) {  
       this.pageNo = pageNo;  
    }  
    public int getPageSize() {  
       return pageSize;  
    }  
    public void setPageSize(int pageSize) {  
       this.pageSize = pageSize;  
    }  
    
    public long getBegin() {
		return begin;
	}
	public void setBegin(long begin) {
		this.begin = begin;
	}
	public int getTotalRecord() {
       return totalRecord;  
    }  
   
    public void setTotalRecord(int totalRecord) {  
       this.totalRecord = totalRecord;  
       //在设置总页数的时候计算出对应的总页数，在下面的三目运算中加法拥有更高的优先级，所以最后可以不加括号。  
       int totalPage = totalRecord%pageSize==0 ? totalRecord/pageSize : totalRecord/pageSize + 1;  
       this.setTotalPage(totalPage);  
    }  
   
    public int getTotalPage() {  
       return totalPage;  
    }  
   
    public void setTotalPage(int totalPage) {  
       this.totalPage = totalPage;  
    }  
   
    public List<T> getRecords() {
		return records;
	}
	public void setRecords(List<T> records) {
		this.records = records;
	}
	public Map<String, Object> getParams() {  
       return params;  
    }  
     
    public void setParams(Map<String, Object> params) {  
       this.params = params;
    }  
   
    public Boolean getGettotal() {
		return gettotal;
	}
	public void setGettotal(Boolean gettotal) {
		this.gettotal = gettotal;
	}
	@Override  
    public String toString() {  
       StringBuilder builder = new StringBuilder();  
       builder.append("Page [pageNo=").append(pageNo).append(", pageSize=")  
              .append(pageSize).append(", results=").append(records).append(  
                     ", totalPage=").append(totalPage).append(  
                     ", totalRecord=").append(totalRecord).append("]");  
       return builder.toString();  
    }  
   
}  
