package service.account;

import java.util.List;

import javax.annotation.Resource;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.access.core.commons.Page;
import com.access.core.constant.Constants;
import com.access.core.util.StringUtil;
import com.access.model.account.AccountTag;
import com.access.model.account.AccountWithBLOBs;
import com.access.model.account.Permission;
import com.access.service.account.AccountService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:applicationContext.xml"})
@Transactional
@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)
public class AccountServiceJunit {
//	@Resource(name="accountService")
//	private AccountService accountService;
//	
//	
//	/**
//	 * 查询登录账户
//	 * @return
//	 */
////	@Test
////	public void getLoginAccount() throws Exception{
////		AccountWithBLOBs account = new AccountWithBLOBs();
////		account.setUsername("superadmin");
////		account.setPassword(StringUtil.getMd5Str("superadmin"));
////		accountService.getLoginAccount(account);
////	}
//	
//	
//	/**
//	 * 根据ID查询详情
//	 * @return
//	 */
////	@Test
////	public void getAccountById(){
////		System.err.println("=============="+accountService.getAccountById(1L));
////	}
//	
//	/**
//	 * 查看用户名是否已经存在
//	 * @param username
//	 * @return
//	 */
////	@Test
////	public void getCountByUsername(){
////		System.out.println("============="+accountService.getCountByUsername("zhangsan"));;
////	}
//	
//	/**
//	 * 注册
//	 * @param account
//	 * @return
//	 */
////	@Test
////	public void saveOrUpdate() throws Exception{
////		AccountWithBLOBs account = new AccountWithBLOBs();
////		account.setUsername("test2");
////		account.setPassword(StringUtil.getMd5Str("123456"));
////		account.setEmail("123456@qq.com");
////		account.setFullname("管理员");
////		account.setType(Constants.ACCOUNT_TYPE_ADMINISTRATOR_EN);
////		int result = accountService.saveOrUpdate(account);
////		System.err.println("==========="+result);
////	}
//	
//	/**
//	 * 根据账户类型查找所拥有的权限
//	 * @param type
//	 * @return
//	 */
////	@Test
////	public void getPermListByType(){
////		List<Permission> list = accountService.getPermListByType(Constants.ACCOUNT_TYPE_ADMINISTRATOR_EN);
////		System.err.println("====="+list.size());
////	}
//	
//	/**
//	 * 编辑账户
//	 * @param account
//	 * @param accountIdArr
//	 * @return
//	 */
////	@Test
////	public void editAccount(){
////		AccountWithBLOBs account = new AccountWithBLOBs();
////		account.setUsername("test2");
////		account.setPassword(StringUtil.getMd5Str("123456"));
////		account.setEmail("123456@qq.com");
////		account.setFullname("管理员");
////		account.setType(Constants.ACCOUNT_TYPE_ADMINISTRATOR_EN);
////		System.err.println("========="+accountService.editAccount(account));
////		
////	}
//	
//	/**
//	 * 查询或新增账户标签
//	 * @param name
//	 * @return
//	 */
////	@Test
////	public void getOrCreateTagByName(){
////		AccountTag tag = accountService.getOrCreateTagByName("狂人");
////		System.err.println("========"+tag.getId());
////	}
//	
//	/**
//	 * 查询账户的标签
//	 * @param accountId
//	 * @return
//	 */
////	@Test
////	public void selectByAccountId(){
////		accountService.selectByAccountId(1L);
////	}
//	
//	/**
//	 * 分页查询用户操作日志-有排序
//	 * @param page
//	 * @param id
//	 * @return
//	 */
////	@Test
////	@SuppressWarnings("unchecked")
////	public void findAccountOptLogPage(){
////		Page page = new Page();
////		accountService.findAccountOptLogPage(page, "create_datetime.desc", 1L);
////		System.err.println("======"+page.getRecords().size());
////	}
//	
//	/**
//	 * 分页查询用户操作日志-无排序
//	 * @param page
//	 * @param id
//	 * @return
//	 */
////	@Test
////	public void findAccountOptLogPage1(){
////		Page page = new Page();
////		accountService.findAccountOptLogPage(page, null, 1L);
////		System.err.println("======"+page.getRecords().size());
////	}
//	
//	/**
//	 * 分页查询账户信息
//	 * @param page
//	 * @param orderString
//	 * @param id
//	 * @return
//	 */
////	@Test
////	@SuppressWarnings("unchecked")
////	public void findAccountPage(){
////		Page page = new Page();
////		accountService.findAccountPage(page, "zhangsan", 1L);
////		System.err.println("======"+page.getRecords().size());
////		AccountWithBLOBs account = (AccountWithBLOBs) page.getRecords().get(0);
////		System.err.println("======"+account.getFullname());
////		
////	}
//	
//	/**
//	 * 查询账户详细信息
//	 * @param accountId
//	 * @return
//	 */
////	@Test
////	public void getAccountInfo(){
////		AccountWithBLOBs account = accountService.getAccountInfo(1L);
////		System.err.println("======"+account.getTags());
////		System.err.println("======"+account.getPermissions());
////	}
//	
//	/**
//	 * 对用户加锁/解锁
//	 * @param account
//	 * @return
//	 */
////	@Test
////	public void updateAccountStatus(){
////		AccountWithBLOBs account = new AccountWithBLOBs();
////		account.setId(1L);
////		account.setStatus(Constants.ACCOUNT_STATUS_NORMAL);
////		int result = accountService.updateAccountStatus(account);
////		System.err.println("=========="+result);
////	}
//	
//	/**
//	 * 修改密码
//	 * @param account
//	 * @return
//	 */
//	@Test
//	public void updatePassword(){
//		AccountWithBLOBs account = new AccountWithBLOBs();
//		account.setId(2L);
//		account.setPassword(StringUtil.getMd5Str("111111"));
//		int result = accountService.updatePassword(account);
//		System.err.println("======="+result);
//	}
//	
//	public static void main(String[] args) {
//		
//	}
}
