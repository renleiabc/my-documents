/**
 * Created by linpeifeng on 17-7-12.
 */
////////////////////////////////////////////////////////////////////////
// 0.00.001-20170712  林沛丰  车票盘点记录
///////////////////////////////////////////////////////////////////////
/// \brief
/// \date 2017-07-12
/// \author 林沛丰
/// \version 0.00.000

function HMApp() {
    HMWebAppInterface.call(this);
    HMRequestMessage.call(this);
    var SI = this;

    ///////////////////////////////////////////////////////////////
    //私有变量声明区
    /////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////
    //公有变量声明区
    /////////////////////////////////////////////////////////////
var inventoryRecord = {};

    ///////////////////////////////////////////////////////////////////////////
    //通讯控制，
    ///////////////////////////////////////////////////////////////////////////


    this.initHandlers = function () {
        var handlers = {};

        //注册消息处理器,example .rewrite your handers here!
        handlers["error"] = handleErrorMessage;
        handlers["ticketStore"] = handleTicketStoreMessage;
        handlers["ticketInventoryCheckRecord"] = handleTicketInventoryCheckRecordMessage;

        return handlers;
    }

    //状态检测函数
    this.onStateChanged = function (event) {
        var state = SI.socket.state();
        if (state === 0) {// 连接尚未建立
            /**/

        }
        else if (state === 1) {
            //WebSocket的链接已经建立
            $('#historyReport').treegrid('loading');
            SI.requestGetTicketStore(SI, {})
        }
        else if (state === 2) {
            //连接正在关闭

        }
        else if (state === 3) {//连接已经关闭或不可用

        }
        else {

        }
        //rewrite your onopen functions
        //SI.socket.sendTextMessage((new Date()));
    }

    ///////////////////////////////////////////////////////////////////////////
    //事件初始化

    this.event = function () {

        var date = new Date();
        date.getFullYear();
        date.setMonth(0);
        date.setDate(1);  //时间设置一号

        $('#startTime').datebox('setValue', HMWeb.secondToString(HMWeb.toSeconds(date), 2))

        $('#endTime').datebox('setValue', HMWeb.secondToString(HMWeb.currentTimeSeconds(), 2))

        $('#buttonSearch').click(function () {

            var obj = getTicketInventoryCheckRecord();


            if (!parseInt(obj.storeNum)) {
                HMWeb.error('', '请选择一个要查看的仓库')
                return
            }
            if (HMWeb.toSeconds(obj.endDate) < HMWeb.toSeconds(obj.startDate)) {
                HMWeb.error('', '截至时间不能小于开始时间')
                return
            }
            SI.requestGetTicketInventoryCheckRecord(SI, getTicketInventoryCheckRecord())
        })
    }

    ///////////////////////////////////////////////////////////////////////////
    //私有函数

    ///////////////////////////////////////////////////////////////////////////
    //获取盘点记录
    function getTicketInventoryCheckRecord() {
        var obj = {
            "startDate": $('#startTime').datebox('getValue'),
            "endDate": $('#endTime').datebox('getValue'),
            "storeNum": $('#ticketStore').combobox('getValue')

        }
        return obj;
    }


    ///////////////////////////////////////////////////////////////////////////
    //消息处理函数
    ///////////////////////////////////////////////////////////////////////////
    /// \brief
    /// \date 2017-02-13
    /// \author 林沛丰
    //错误
    function handleErrorMessage(json) {
        if (json.request.command == 'getTicketStore') {
            HMWeb.error('', '获取仓库失败!')
        }
        if (json.request.command == 'getTicketInventoryCheckRecord') {
            HMWeb.error('', '获取盘点记录失败!')
        }

    }

    //车票仓库
    function handleTicketStoreMessage(json) {
        if (json.request.command == 'getTicketStore') {
            var data = json.ticketStore.datas;
            if (!data.length) {
                return HMWeb.error('', '获取仓库失败!');
            }
            $('#ticketStore').combobox({
                valueField: 'storeNum',
                textField: 'storeName',
                data: data,
                onLoadSuccess: function (data) {
                    $('#ticketStore').combobox('setValue', data[0].storeNum)
                },
            })

        }
        SI.requestGetTicketInventoryCheckRecord(SI, getTicketInventoryCheckRecord())
    }

    //盘点记录
    function handleTicketInventoryCheckRecordMessage(json) {
        var inventoryData = {};
        inventoryData.rows = [];
        var arrTime = [];
        var arrDoc = [];
        var $historyReport = $('#historyReport');
        if (json.request.command == "getTicketInventoryCheckRecord") {
            var data = json.ticketInventoryCheckRecord.datas;
            console.log(JSON.stringify(data));
            if (data.length===0) {
                inventoryRecord.record = data;
                $historyReport.treegrid({"data":{rows:[{id:1,name:
                SI.tableEmptyTip}]}}).treegrid('mergeCells',
                    { index:1,field: 'name', colspan: 4});
                return false;
            } else {
                for (var i = 0; i < data.length; i++) {
                    var objTime = {}, objDocumentNum = {};
                    objTime.name = HMWeb.secondToString(data[i].operationTime, 2);
                    objDocumentNum.name = data[i].documentNum;
                    objDocumentNum.time = HMWeb.secondToString(data[i].operationTime, 2);
                    arrTime.push(objTime);
                    arrDoc.push(objDocumentNum);
                }
                //数组去重函数调用
                var time = uniquelObj(arrTime);
                //数据重组函数调用；
                var arr = dataReorganization(arrDoc);
                for (var i = 0; i < time.length; i++) {
                    var obj = {};
                    obj.id = i + 1;
                    obj.name = time[i].name;
                    inventoryData.rows.push(obj);
                    for (var j = 0; j < arr.length; j++) {
                        if (time[i].name === arr[j].time) {
                            var num = {};
                            num.id = parseInt(obj.id + (j + 1).toString())
                            num._parentId = obj.id;
                            num.name = arr[j].name;
                            num.time = arr[j].time;
                            inventoryData.rows.push(num);
                            for (var k = 0; k < data.length; k++) {
                                var name = {};
                                var dateTime = HMWeb.secondToString(data[k].operationTime, 2)
                                if (arr[j].time === dateTime && arr[j].name === data[k].documentNum) {
                                    name.id = parseInt(num.id + (k + 1).toString());
                                    name._parentId = num.id;
                                    name.name = data[k].name;
                                    name.documentNum = data[k].documentNum;
                                    name.beforeCount = data[k].beforeCount;
                                    name.count = data[k].count;
                                    name.operatorName = data[k].operatorName;
                                    inventoryData.rows.push(name);
                                }
                            }
                        }
                    }
                }
               // console.log(JSON.stringify(inventoryData.rows));
                //点击全部合起
                $("#collapseAll").on('click', function () {
                    $historyReport.treegrid('collapseAll');
                })
                //点击全部打开
                $("#expandAll").on('click', function () {
                    $historyReport.treegrid('expandAll');
                })
                var title = $("#ticketStore").combobox("getText");
                $historyReport.treegrid({
                    title: title,
                    data: inventoryData
                }).treegrid().treegrid('loaded');
                //存储数据；
                console.log(JSON.stringify(data));
                inventoryRecord.record = data;
                inventoryRecord.title = title;
            }
        }
    }
    //数组去重函数；
    function uniquelObj(arr) {
        var tmp = [];
        for (var i = 0; i < arr.length; i++) {
            for (var key in arr[i]) {
                tmp[arr[i][key]] = 1;
            }
        }
        var tmpArr = [];
        for (var n in tmp) {
            var obj = {};
            obj.name = n;
            tmpArr.push(obj);
        }
        return tmpArr;
    }

    //对数组里面完全相同的数据进行删除
    function dataReorganization(arr) {
        var data = [];
        for (var i = 0; i < arr.length; i++) {
            //console.log(arr[i])
            if (!arr[i].visited) {
                data.push(arr[i]);
                for (var j = 1; j < arr.length - 1; j++) {
                    if (arr[i].name == arr[j].name &&
                        arr[i].time == arr[j].time) {
                        arr[j].visited = true;
                    }
                }
            }
        }
        //去除元素里面的visited
        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                if (key == "visited") {
                    delete data[i][key];
                }
            }
        }
        return data;
    }
    //////////////////////////////////////////////////////////////////////////////
    //init打印并存储数据
    $("#printData").on('click',function (e) {

        if(inventoryRecord.record.length === 0){
            HMWeb.tip("","暂无数据，无法打印");
            e.preventDefault();
            window.sessionStorage.removeItem('inventory');
            return false;
        }else{
            //开始时间
            inventoryRecord.start = $("#startTime").combobox("getText");
            //结束时间
            inventoryRecord.end = $("#endTime").combobox("getText");
            window.sessionStorage.removeItem('inventory');
            var saveData = encodeURIComponent(JSON.stringify(inventoryRecord));
            window.sessionStorage.setItem("inventory",saveData);
        }

    })
    /////////////////////////////////////////////////////////////////////////
    this.event();
    this.initialize();
}

window.onload = function () {
    var app = new HMApp();
}

