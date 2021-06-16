import React from 'react';
import { Typography, Tabs,Table, } from 'antd';
import styles from './index.less';

const { Title, Paragraph, Text, Link } = Typography;
const { Column } = Table;
const { TabPane } = Tabs;

const apiDataSource = [
  {
    title:'timestamp',
    required:'是',
    type:'Date',
    description:'时间戳，例如：1468476350。API服务端允许客户端请求最大时间误差为10分钟。',
  },
  {
    title:'sign',
    required:'是',
    type:'string',
    description:'API输入参数签名结果,签名算法参照下面的介绍。',
  }
];

const headerDemo = {
  "java": `  HttpPost httpPost = new org.apache.http.client.methods.HttpPost(url);
  httpPost.addHeader("Authorization","Bearer "+ accessToken);`,
  "c#":`  var http = new System.Net.Http.HttpClient();
  AuthenticationHeaderValue bearer = new AuthenticationHeaderValue("Bearer", accessToken);
  http.DefaultRequestHeaders.Authorization = bearer;`,
  "php":`  $ci = curl_init();
  $headers[] = "Authorization: Bearer ".$access_token;
  curl_setopt($ci, CURLOPT_HTTPHEADER, $headers );
  curl_setopt($ci, CURLINFO_HEADER_OUT, TRUE );`
}
const SignDemo = {
  java:`  Map<String, String> data = new HashMap<String, String>();
  data.put("mobile_operators", "tplus");
  data.put("telephone_number", "2076005343");
  data.put("out_trade_no", "2016071414055032");
  data.put("top_up_amount", "5000");
  //timestamp 为调用Api的公共参数，详细说明参考接入指南
  data.put("timestamp", '1468476350');//假设当前时间为2016/7/14 14:5:50
  //对键排序
  String[] keys = data.keySet().toArray(new String[0]);
  Arrays.sort(keys);
  StringBuilder query = new StringBuilder();
  //头加入AppSecret ，假设AppSecret值为******************
  query.append(this.getClientSecret());
  for (String key : keys) {
      String value = data.get(key);
      query.append(key).append(value);
  }
  //到这query的值为******************modifyTimeStart2016-07-13 10:44:30pageNo1pageSize20timestamp1468476350
  //尾加入AppSecret
  query.append(this.getClientSecret()); //query=******************modifyTimeStart2016-07-13 10:44:30pageNo1pageSize20timestamp1468476350******************
  byte[] md5byte = encryptMD5(query.toString());
  //sign 为调用Api的公共参数，详细说明参考接入指南
  data.put("sign", byte2hex(md5byte)); //byte2hex(md5byte) = 935671331572EBF7F419EBB55EA28558

  // Md5摘要
  public byte[] encryptMD5(String data) throws NoSuchAlgorithmException, UnsupportedEncodingException {
      MessageDigest md5 = MessageDigest.getInstance("MD5");
      return md5.digest(data.getBytes("UTF-8"));
  }

  public String byte2hex(byte[] bytes) {
      StringBuilder sign = new StringBuilder();
      for (int i = 0; i < bytes.length; i++) {
          String hex = Integer.toHexString(bytes[i] & 0xFF);
          if (hex.length() == 1) {
              sign.append("0");
          }
          sign.append(hex.toLowerCase());
      }
      return sign.toString();
  }`,
  "c#":`var args = new Dictionary<string, string>()
  {
      {"mobile_operators","tplus"},
      {"telephone_number","2076005343"},
      {"out_trade_no","2016071414055032"},
      {"top_up_amount","5000"},
      //timestamp 为调用Api的公共参数，详细说明参考接入指南
      {"timestamp",'1468476350'} //假设当前时间为2016/7/14 14:5:50
  };
  //排序
  var en = args.OrderBy(m => m.Key, StringComparer.Ordinal);
  string str = "";
  foreach (var m in en)
  {
      str += (m.Key + m.Value);
  }
  //到这str的值为modifyTimeStart2016-07-13 10:44:30pageNo1pageSize20timestamp1468476350
  //头尾加入AppSecret ，假设AppSecret值为******************
  str = ClientSecret + str + ClientSecret;  //str=******************modifyTimeStart2016-07-13 10:44:30pageNo1pageSize20timestamp1468476350******************
  var encodeStr = MD5Encrypt(str);   //encoderStr=935671331572EBF7F419EBB55EA28558
  //sign 为调用Api的公共参数，详细说明参考接入指南
  args.Add("sign", encodeStr);

  //Md5摘要
  public string MD5Encrypt(string text)
  {
      MD5 md5 = new MD5CryptoServiceProvider();
      byte[] fromData = System.Text.Encoding.UTF8.GetBytes(text);
      byte[] targetData = md5.ComputeHash(fromData);
      string byte2String = null;

      for (int i = 0; i < targetData.Length; i++)
      {
          byte2String += targetData[i].ToString("X2");
      }

      return byte2String;
  }`,
  php:`  $params = array();
  $params['mobile_operators'] = 'tplus';
  $params['telephone_number'] = '2076005343';
  $params['out_trade_no'] = '2016071414055032';
  $params['top_up_amount'] = '5000';
  //timestamp 为调用Api的公共参数，详细说明参考接入指南
  $params['timestamp'] = time();//假设当前时间为2016/7/14 14:5:50
  ksort($params);
  $str='';
  foreach ($args as $key => $value)
  {
      $str .= ($key . $value);
  }
  //到这$str的值为modifyTimeStart2016-07-13 10:44:30pageNo1pageSize20timestamp1468476350
  //头尾加入AppSecret ，假设AppSecret值为******************
  $str = $this->client_secret . $str . $this->client_secret; //$str=******************modifyTimeStart2016-07-13 10:44:30pageNo1pageSize20timestamp1468476350
  $encodeStr = md5($str); //$encodeStr=935671331572EBF7F419EBB55EA28558
  //sign 为调用Api的公共参数，详细说明参考接入指南
  $params['sign'] = $encodeStr;`
}

const ExampleDemo = {
  java:` public String Topup() {
      String appSecret = "******************";
      String accessToken = "*************************";

      CloseableHttpClient httpclient = HttpClients.createDefault();
      HttpPost httpPost = new HttpPost("http://api.hfniudao.com/api/gateway/topUp");
      // 设置头部
      httpPost.addHeader("Authorization", "Bearer " + accessToken);
      // 业务参数
      Map<String, String> data = new HashMap<String, String>();

      data.put("mobile_operators", "tplus");
      data.put("telephone_number", "2076005343");
      data.put("out_trade_no", "2016071414055032");
      data.put("top_up_amount", "5000");
      Long timestamp = System.currentTimeMillis() / 1000;
      data.put("timestamp", timestamp.toString());
      // 参数签名
      try {
          data.put("sign", sign(data, appSecret));
      } catch (NoSuchAlgorithmException e) {
          e.printStackTrace();
      } catch (UnsupportedEncodingException e) {
          e.printStackTrace();
      }
      List<BasicNameValuePair> params = new ArrayList<BasicNameValuePair>();
      for (Map.Entry<String, String> entry : data.entrySet()) {
          params.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
      }
      // 发起POST请求
      try {
          httpPost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
          HttpResponse httpResponse = httpclient.execute(httpPost);
          if (httpResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
              return EntityUtils.toString(httpResponse.getEntity());
          } else {
              return ("doPost Error Response: " + httpResponse.getStatusLine().toString());
          }
      } catch (Exception e) {
          e.printStackTrace();
          return null;
      }
  }

  // 参数签名
  public String sign(Map<String, String> params, String appSecret)
      throws NoSuchAlgorithmException, UnsupportedEncodingException {
      String[] keys = params.keySet().toArray(new String[0]);
      Arrays.sort(keys);

      StringBuilder query = new StringBuilder();
      query.append(appSecret);
      for (String key : keys) {
          String value = params.get(key);
          query.append(key).append(value);
      }
      query.append(appSecret);

      byte[] md5byte = encryptMD5(query.toString());

      return byte2hex(md5byte);
  }

  // byte数组转成16进制字符串
  public static String byte2hex(byte[] bytes) {
      StringBuilder sign = new StringBuilder();
      for (int i = 0; i < bytes.length; i++) {
          String hex = Integer.toHexString(bytes[i] & 0xFF);
          if (hex.length() == 1) {
              sign.append("0");
          }
          sign.append(hex.toLowerCase());
      }
      return sign.toString();
  }

  // Md5摘要
  public static byte[] encryptMD5(String data) throws NoSuchAlgorithmException, UnsupportedEncodingException {
      MessageDigest md5 = MessageDigest.getInstance("MD5");
      return md5.digest(data.getBytes("UTF-8"));
  }`,
  "c#":`  public String Topup()
  {
      string accessToken = "*************";
      string appSecret = "*************";
      WebRequest apiRequest = WebRequest.Create("http://api.hfniudao.com/api/gateway/topUp");
      apiRequest.Method = "POST";
      apiRequest.ContentType = "application/x-www-form-urlencoded";
      apiRequest.Headers.Add("Authorization", "Bearer " + accessToken);
      //业务参数
      TimeSpan ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
      var args = new Dictionary<string,string>()
          {
              {"mobile_operators","tplus"},
              {"telephone_number","2076005343"},
              {"out_trade_no","2016071414055032"},
              {"top_up_amount","5000"},
              {"timestamp",Convert.ToInt64(ts.TotalSeconds).ToString()}
          };
      args.Add("sign", Sign(args, appSecret));

      //拼装POST数据
      string postData = "";
      foreach (var p in args)
      {
          if (!String.IsNullOrEmpty(postData))
          {
              postData += "&";
          }
          string tmpStr = String.Format("{0}={1}", p.Key, HttpUtility.UrlEncode(p.Value));
          postData += tmpStr;
      }
      using (var sw = new StreamWriter(apiRequest.GetRequestStream()))
      {
          sw.Write(postData);
      }
      WebResponse apiResponse = null;
      try
      {
          apiResponse = apiRequest.GetResponse();
      }
      catch (WebException we)
      {
          if (we.Status == WebExceptionStatus.ProtocolError)
          {
              apiResponse = (we.Response as HttpWebResponse);
          }
          else{
              //TODO:处理异常
              return "";
          }
      }
      using(Stream apiDataStream = apiResponse.GetResponseStream()){
          using(StreamReader apiReader = new StreamReader(apiDataStream, Encoding.UTF8)){
              string apiResult = apiReader.ReadToEnd();
              apiReader.Close();
              apiResponse.Close();
              return apiResult;
          }
      }
  }
  //参数签名
  public string Sign(IDictionary<string,string> args, string ClientSecret)
  {
      IDictionary<string, string> sortedParams = new SortedDictionary<string, string>(args, StringComparer.Ordinal);
      string str = "";
      foreach (var m in sortedParams)
      {
          str += (m.Key + m.Value);
      }
      //头尾加入AppSecret
      str = ClientSecret + str + ClientSecret;
      var encodeStr = MD5Encrypt(str);
      return encodeStr;
  }
  //Md5摘要
  public static string MD5Encrypt(string text)
  {
      MD5 md5 = new MD5CryptoServiceProvider();
      byte[] fromData = System.Text.Encoding.UTF8.GetBytes(text);
      byte[] targetData = md5.ComputeHash(fromData);
      string byte2String = null;
      for (int i = 0; i < targetData.Length; i++)
      {
          byte2String += targetData[i].ToString("x2");
      }
      return byte2String;
  }`,
  php:`  function Topup(){
      $appSecret = "******************";
      $accessToken = "*************************";

        //业务参数
      $params = array();
      $params['mobile_operators'] = 'tplus';
      $params['telephone_number'] = '2076005343';
      $params['out_trade_no'] = '2016071414055032';
      $params['top_up_amount'] = '5000';
      $params['timestamp'] = time();
      $params['sign'] = sign($params,$appSecret);

      //设置Header
      $headers[] = "Authorization: Bearer ".$accessToken;

      $ci = curl_init();
      curl_setopt($ci, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);
      curl_setopt($ci, CURLOPT_RETURNTRANSFER, TRUE);
      curl_setopt($ci, CURLOPT_ENCODING, "");
      if (version_compare(phpversion(), '5.4.0', '<')) {
          curl_setopt($ci, CURLOPT_SSL_VERIFYHOST, 1);
      } else {
          curl_setopt($ci, CURLOPT_SSL_VERIFYHOST, 2);
      }
      curl_setopt($ci, CURLOPT_HEADER, FALSE);
      curl_setopt($ci, CURLOPT_POST, TRUE);
      curl_setopt($ci, CURLOPT_POSTFIELDS, $params);
      curl_setopt($ci, CURLOPT_URL, 'http://api.hfniudao.com/api/gateway/topUp' );
      curl_setopt($ci, CURLOPT_HTTPHEADER, $headers );
      curl_setopt($ci, CURLINFO_HEADER_OUT, TRUE );
      $response = curl_exec($ci);
      curl_close ($ci);
      return $response;
  }
  function sign($args,$client_secret) {
      ksort($args);
      $str='';
      foreach ($args as $key => $value)
      {
        $str .= ($key . $value);
      }
      //头尾加入AppSecret
      $str = $client_secret . $str . $client_secret;
      $encodeStr = md5($str);
      return $encodeStr;
  }`
}



const PageGuide = function (){
  return(
    <Typography style={{maxWidth:1200}}>
      <Title level={4}>1、调用接口详解</Title>
      <Text>调用任何一个API都必须把AccessToken添加到Header ,格式为"Authorization: Bearer access_token"，其中Bearer后面有一个空格。同时还需传入以下公共参数：</Text>
      <Table dataSource={apiDataSource} pagination={false} bordered>
        <Column title="参数名" dataIndex="title" />
        <Column title="必选" dataIndex="required" />
        <Column title="类型" dataIndex="type" />
        <Column title="说明" dataIndex="description" />
      </Table>
      <Title level={4}>2、签名算法</Title>
      <Paragraph>
        <ul>
          <li>【对所有API请求参数（包括公共参数和业务参数，但除去sign参数和byte[]类型的参数），根据参数名称的ASCII码表的顺序排序。如：foo=1, bar=2, foo_bar=3, foobar=4排序后的顺序是bar=2, foo=1, foo_bar=3, foobar=4。</li>
          <li>将排序好的参数名和参数值拼装在一起，根据上面的示例得到的结果为：bar2foo1foo_bar3foobar4。</li>
          <li>把拼装好的字符串采用utf-8编码，在拼装的字符串前后加上app的secret后，使用MD5算法进行摘要，如：md5(secret+bar2foo1foo_bar3foobar4+secret)；</li>
        </ul>
      </Paragraph>
      <Title level={4}>3、Header设置示例代码</Title>
      <Tabs type="card" >
        <TabPane tab="Java" key="1">
          <div className={styles.code}>{headerDemo.java}</div>
        </TabPane>
        <TabPane tab="C#" key="2">
          <div className={styles.code}>{headerDemo["c#"]}</div>
        </TabPane>
        <TabPane tab="PHP" key="3">
          <div className={styles.code}>{headerDemo.php}</div>
        </TabPane>
      </Tabs>
      <Title level={4}>4、签名算法示例代码</Title>
      <Tabs type="card" >
        <TabPane tab="Java" key="1">
          <div className={styles.code}>
            {SignDemo.java}
          </div>
        </TabPane>
        <TabPane tab="C#" key="2">
          <div className={styles.code}>
            {SignDemo['c#']}
          </div>
        </TabPane>
        <TabPane tab="PHP" key="3">
          <div className={styles.code}>
            {SignDemo.php}
          </div>
        </TabPane>
      </Tabs>
      <Title level={4}>5、完整调用API示例代码</Title>
      <Tabs type="card" >
        <TabPane tab="Java" key="1">
          <div className={styles.code}>
            {ExampleDemo.java}
          </div>
        </TabPane>
        <TabPane tab="C#" key="2">
          <div className={styles.code}>
            {ExampleDemo['c#']}
          </div>
        </TabPane>
        <TabPane tab="PHP" key="3">
          <div className={styles.code}>
            {ExampleDemo.php}
          </div>
        </TabPane>
      </Tabs>
    </Typography>
  )
}

export default PageGuide;
