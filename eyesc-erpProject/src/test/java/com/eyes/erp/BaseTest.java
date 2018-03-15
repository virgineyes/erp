//package com.eyes.erp;
//
//import org.junit.runner.RunWith;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//
//import javax.naming.Context;
//import javax.naming.InitialContext;
//
//import oracle.ucp.jdbc.PoolDataSource;
//import oracle.ucp.jdbc.PoolDataSourceFactory;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(value = {"classpath*:/spring/*-app.xml"})
////@TransactionConfiguration(transactionManager = "transactionManagerPortal2", defaultRollback = false)
////@Transactional
////@ContextConfiguration(locations = {"file:src/main/resources/springConfig/*.xml"})
//@org.junit.Ignore
//public class BaseTest {
//
//    static {
//        // setup the jndi context and the datasource
//        try {
//            // Create initial context
//            System.setProperty(Context.INITIAL_CONTEXT_FACTORY,
//                    "org.apache.naming.java.javaURLContextFactory");
//            System.setProperty(Context.URL_PKG_PREFIXES, "org.apache.naming");
//            InitialContext ic = new InitialContext();
//
//            ic.createSubcontext("java:");
//            ic.createSubcontext("java:comp");
//            ic.createSubcontext("java:comp/env");
//            ic.createSubcontext("java:comp/env/jdbc");
//            
//            PoolDataSource pds = createDataSource("jdbc:oracle:thin:@wtu-db-dev:1521:portaldbdev", "BI_DIM", "BI_DIM");
//            //PoolDataSource pds = createDataSource("jdbc:oracle:thin:@wtu-ods-prod:1521:ods", "BI_DIM", "bi_dim");
//            //PoolDataSource pds = createDataSource("jdbc:oracle:thin:@localdb:1521:orcl", "EIP2", "EIP2");
//            ic.bind("java:comp/env/jdbc/erpDb", pds);                                  
//            
//        } catch (Exception e) {
//            e.printStackTrace();
//        }        
//    }
//    	
//    private static PoolDataSource createDataSource(String url, String userName, String passwd) throws Exception {
//        PoolDataSource pds = PoolDataSourceFactory.getPoolDataSource(); 
//        pds.setConnectionFactoryClassName("oracle.jdbc.pool.OracleDataSource");
//        pds.setURL(url);
//        pds.setUser(userName);
//        pds.setPassword(passwd);
//        pds.setConnectionPoolName(userName);
//        pds.setMinPoolSize(1); 
//        pds.setMaxPoolSize(5); 
//        pds.setInitialPoolSize(1); 
//        pds.setInactiveConnectionTimeout(60);
//        return pds;
//    }
//}
