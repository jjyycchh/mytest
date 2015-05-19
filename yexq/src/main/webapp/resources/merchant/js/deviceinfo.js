/**
 * Created by cx on 2014/8/14.
 */
var select_device_ids=[];
var _devicename = null;
var _configitemsjs = null;
var device_info = null;
var deviceinfoApp = function(){
	
	var userSearchHandler = null;
	userSearchHandler = new searchUtil(generateUserDeviceListHtml, searchFailCallBack, searchErrorCallBack, null, null,
			"tbl_user_lst", "lb_pagenumber_useron", "a_pagination_previous_useron", "a_pagination_next_useron", 
			"/device/usersondevice.htm","");
		
	var searchUsersonDevice = function(){
		showLoading();
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/device/usersondevice.htm',
			data : {
				'pageNo' : 1,
				'deviceId' : __DATA_PUBLIC_KEY
			},
			success : function(data) {
				if (data.result != 'FAIL' && data.records != null) {
					$("#tbl_user_lst").html(generateUserDeviceListHtml(data.records));
										
				} else {
					closeLoading();
					return false;
				}
				closeLoading();
			},
			error : function(data) {
				closeLoading();
				return false;
			}
		});
	}
	

    var initCPUChart = function(){
        if($('div.Device-Hard-Chart-CPU').length>0){
            $('div.Device-Hard-Chart-CPU').highcharts({
                chart: {
                    zoomType: 'x',
                    spacingRight: 20,
                    height:120,
                    width:270
                },
                credits:{enabled:false},
                title: {
                    text: 'CPU负载时势图',
                    style:'font-size:12px'
                },
                xAxis: {
                    type: 'datetime',
                    maxZoom: 14 * 24 * 3600000, // fourteen days
                    title: {
                        enabled:false
                    }
                },
                yAxis: {
                    title: {
                        enabled:false
                    }
                },
                tooltip: {
                    shared: true
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        lineWidth: 1,
                        marker: {
                            enabled: false
                        },
                        shadow: false,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },

                series: [{
                    type: 'area',
                    name: 'USD to EUR',
                    pointInterval: 24 * 3600 * 1000,
                    pointStart: Date.UTC(2006, 0, 01),
                    data: [
                        0.8446, 0.8445, 0.8444, 0.8451,    0.8418, 0.8264,    0.8258, 0.8232,    0.8233, 0.8258,
                        0.8283, 0.8278, 0.8256, 0.8292,    0.8239, 0.8239,    0.8245, 0.8265,    0.8261, 0.8269,
                        0.8273, 0.8244, 0.8244, 0.8172,    0.8139, 0.8146,    0.8164, 0.82,    0.8269, 0.8269,
                        0.8269, 0.8258, 0.8247, 0.8286,    0.8289, 0.8316,    0.832, 0.8333,    0.8352, 0.8357,
                        0.8355, 0.8354, 0.8403, 0.8403,    0.8406, 0.8403,    0.8396, 0.8418,    0.8409, 0.8384,
                        0.8386, 0.8372, 0.839, 0.84, 0.8389, 0.84, 0.8423, 0.8423, 0.8435, 0.8422,
                        0.838, 0.8373, 0.8316, 0.8303,    0.8303, 0.8302,    0.8369, 0.84, 0.8385, 0.84,
                        0.8401, 0.8402, 0.8381, 0.8351,    0.8314, 0.8273,    0.8213, 0.8207,    0.8207, 0.8215,
                        0.8242, 0.8273, 0.8301, 0.8346,    0.8312, 0.8312,    0.8312, 0.8306,    0.8327, 0.8282,
                        0.824, 0.8255, 0.8256, 0.8273, 0.8209, 0.8151, 0.8149, 0.8213, 0.8273, 0.8273,
                        0.8261, 0.8252, 0.824, 0.8262, 0.8258, 0.8261, 0.826, 0.8199, 0.8153, 0.8097,
                        0.8101, 0.8119, 0.8107, 0.8105,    0.8084, 0.8069,    0.8047, 0.8023,    0.7965, 0.7919,
                        0.7921, 0.7922, 0.7934, 0.7918,    0.7915, 0.787, 0.7861, 0.7861, 0.7853, 0.7867,
                        0.7827, 0.7834, 0.7766, 0.7751, 0.7739, 0.7767, 0.7802, 0.7788, 0.7828, 0.7816,
                        0.7829, 0.783, 0.7829, 0.7781, 0.7811, 0.7831, 0.7826, 0.7855, 0.7855, 0.7845,
                        0.7798, 0.7777, 0.7822, 0.7785, 0.7744, 0.7743, 0.7726, 0.7766, 0.7806, 0.785,
                        0.7907, 0.7912, 0.7913, 0.7931, 0.7952, 0.7951, 0.7928, 0.791, 0.7913, 0.7912,
                        0.7941, 0.7953, 0.7921, 0.7919, 0.7968, 0.7999, 0.7999, 0.7974, 0.7942, 0.796,
                        0.7969, 0.7862, 0.7821, 0.7821, 0.7821, 0.7811, 0.7833, 0.7849, 0.7819, 0.7809,
                        0.7809, 0.7827, 0.7848, 0.785, 0.7873, 0.7894, 0.7907, 0.7909, 0.7947, 0.7987,
                        0.799, 0.7927, 0.79, 0.7878, 0.7878, 0.7907, 0.7922, 0.7937, 0.786, 0.787,
                        0.7838, 0.7838, 0.7837, 0.7836, 0.7806, 0.7825, 0.7798, 0.777, 0.777, 0.7772,
                        0.7793, 0.7788, 0.7785, 0.7832, 0.7865, 0.7865, 0.7853, 0.7847, 0.7809, 0.778,
                        0.7799, 0.78, 0.7801, 0.7765, 0.7785, 0.7811, 0.782, 0.7835, 0.7845, 0.7844,
                        0.782, 0.7811, 0.7795, 0.7794, 0.7806, 0.7794, 0.7794, 0.7778, 0.7793, 0.7808,
                        0.7824, 0.787, 0.7894, 0.7893, 0.7882, 0.7871, 0.7882, 0.7871, 0.7878, 0.79,
                        0.7901, 0.7898, 0.7879, 0.7886, 0.7858, 0.7814, 0.7825, 0.7826, 0.7826, 0.786,
                        0.7878, 0.7868, 0.7883, 0.7893, 0.7892, 0.7876, 0.785, 0.787, 0.7873, 0.7901,
                        0.7936, 0.7939, 0.7938, 0.7956, 0.7975, 0.7978, 0.7972, 0.7995, 0.7995, 0.7994,
                        0.7976, 0.7977, 0.796, 0.7922, 0.7928, 0.7929, 0.7948, 0.797, 0.7953, 0.7907,
                        0.7872, 0.7852, 0.7852, 0.786, 0.7862, 0.7836, 0.7837, 0.784, 0.7867, 0.7867,
                        0.7869, 0.7837, 0.7827, 0.7825, 0.7779, 0.7791, 0.779, 0.7787, 0.78, 0.7807,
                        0.7803, 0.7817, 0.7799, 0.7799, 0.7795, 0.7801, 0.7765, 0.7725, 0.7683, 0.7641,
                        0.7639, 0.7616, 0.7608, 0.759, 0.7582, 0.7539, 0.75, 0.75, 0.7507, 0.7505,
                        0.7516, 0.7522, 0.7531, 0.7577, 0.7577, 0.7582, 0.755, 0.7542, 0.7576, 0.7616,
                        0.7648, 0.7648, 0.7641, 0.7614, 0.757, 0.7587, 0.7588, 0.762, 0.762, 0.7617,
                        0.7618, 0.7615, 0.7612, 0.7596, 0.758, 0.758, 0.758, 0.7547, 0.7549, 0.7613,
                        0.7655, 0.7693, 0.7694, 0.7688, 0.7678, 0.7708, 0.7727, 0.7749, 0.7741, 0.7741,
                        0.7732, 0.7727, 0.7737, 0.7724, 0.7712, 0.772, 0.7721, 0.7717, 0.7704, 0.769,
                        0.7711, 0.774, 0.7745, 0.7745, 0.774, 0.7716, 0.7713, 0.7678, 0.7688, 0.7718,
                        0.7718, 0.7728, 0.7729, 0.7698, 0.7685, 0.7681, 0.769, 0.769, 0.7698, 0.7699,
                        0.7651, 0.7613, 0.7616, 0.7614, 0.7614, 0.7607, 0.7602, 0.7611, 0.7622, 0.7615,
                        0.7598, 0.7598, 0.7592, 0.7573, 0.7566, 0.7567, 0.7591, 0.7582, 0.7585, 0.7613,
                        0.7631, 0.7615, 0.76, 0.7613, 0.7627, 0.7627, 0.7608, 0.7583, 0.7575, 0.7562,
                        0.752, 0.7512, 0.7512, 0.7517, 0.752, 0.7511, 0.748, 0.7509, 0.7531, 0.7531,
                        0.7527, 0.7498, 0.7493, 0.7504, 0.75, 0.7491, 0.7491, 0.7485, 0.7484, 0.7492,
                        0.7471, 0.7459, 0.7477, 0.7477, 0.7483, 0.7458, 0.7448, 0.743, 0.7399, 0.7395,
                        0.7395, 0.7378, 0.7382, 0.7362, 0.7355, 0.7348, 0.7361, 0.7361, 0.7365, 0.7362,
                        0.7331, 0.7339, 0.7344, 0.7327, 0.7327, 0.7336, 0.7333, 0.7359, 0.7359, 0.7372,
                        0.736, 0.736, 0.735, 0.7365, 0.7384, 0.7395, 0.7413, 0.7397, 0.7396, 0.7385,
                        0.7378, 0.7366, 0.74, 0.7411, 0.7406, 0.7405, 0.7414, 0.7431, 0.7431, 0.7438,
                        0.7443, 0.7443, 0.7443, 0.7434, 0.7429, 0.7442, 0.744, 0.7439, 0.7437, 0.7437,
                        0.7429, 0.7403, 0.7399, 0.7418, 0.7468, 0.748, 0.748, 0.749, 0.7494, 0.7522,
                        0.7515, 0.7502, 0.7472, 0.7472, 0.7462, 0.7455, 0.7449, 0.7467, 0.7458, 0.7427,
                        0.7427, 0.743, 0.7429, 0.744, 0.743, 0.7422, 0.7388, 0.7388, 0.7369, 0.7345,
                        0.7345, 0.7345, 0.7352, 0.7341, 0.7341, 0.734, 0.7324, 0.7272, 0.7264, 0.7255,
                        0.7258, 0.7258, 0.7256, 0.7257, 0.7247, 0.7243, 0.7244, 0.7235, 0.7235, 0.7235,
                        0.7235, 0.7262, 0.7288, 0.7301, 0.7337, 0.7337, 0.7324, 0.7297, 0.7317, 0.7315,
                        0.7288, 0.7263, 0.7263, 0.7242, 0.7253, 0.7264, 0.727, 0.7312, 0.7305, 0.7305,
                        0.7318, 0.7358, 0.7409, 0.7454, 0.7437, 0.7424, 0.7424, 0.7415, 0.7419, 0.7414,
                        0.7377, 0.7355, 0.7315, 0.7315, 0.732, 0.7332, 0.7346, 0.7328, 0.7323, 0.734,
                        0.734, 0.7336, 0.7351, 0.7346, 0.7321, 0.7294, 0.7266, 0.7266, 0.7254, 0.7242,
                        0.7213, 0.7197, 0.7209, 0.721, 0.721, 0.721, 0.7209, 0.7159, 0.7133, 0.7105,
                        0.7099, 0.7099, 0.7093, 0.7093, 0.7076, 0.707, 0.7049, 0.7012, 0.7011, 0.7019,
                        0.7046, 0.7063, 0.7089, 0.7077, 0.7077, 0.7077, 0.7091, 0.7118, 0.7079, 0.7053,
                        0.705, 0.7055, 0.7055, 0.7045, 0.7051, 0.7051, 0.7017, 0.7, 0.6995, 0.6994,
                        0.7014, 0.7036, 0.7021, 0.7002, 0.6967, 0.695, 0.695, 0.6939, 0.694, 0.6922,
                        0.6919, 0.6914, 0.6894, 0.6891, 0.6904, 0.689, 0.6834, 0.6823, 0.6807, 0.6815,
                        0.6815, 0.6847, 0.6859, 0.6822, 0.6827, 0.6837, 0.6823, 0.6822, 0.6822, 0.6792,
                        0.6746, 0.6735, 0.6731, 0.6742, 0.6744, 0.6739, 0.6731, 0.6761, 0.6761, 0.6785,
                        0.6818, 0.6836, 0.6823, 0.6805, 0.6793, 0.6849, 0.6833, 0.6825, 0.6825, 0.6816,
                        0.6799, 0.6813, 0.6809, 0.6868, 0.6933, 0.6933, 0.6945, 0.6944, 0.6946, 0.6964,
                        0.6965, 0.6956, 0.6956, 0.695, 0.6948, 0.6928, 0.6887, 0.6824, 0.6794, 0.6794,
                        0.6803, 0.6855, 0.6824, 0.6791, 0.6783, 0.6785, 0.6785, 0.6797, 0.68, 0.6803,
                        0.6805, 0.676, 0.677, 0.677, 0.6736, 0.6726, 0.6764, 0.6821, 0.6831, 0.6842,
                        0.6842, 0.6887, 0.6903, 0.6848, 0.6824, 0.6788, 0.6814, 0.6814, 0.6797, 0.6769,
                        0.6765, 0.6733, 0.6729, 0.6758, 0.6758, 0.675, 0.678, 0.6833, 0.6856, 0.6903,
                        0.6896, 0.6896, 0.6882, 0.6879, 0.6862, 0.6852, 0.6823, 0.6813, 0.6813, 0.6822,
                        0.6802, 0.6802, 0.6784, 0.6748, 0.6747, 0.6747, 0.6748, 0.6733, 0.665, 0.6611,
                        0.6583, 0.659, 0.659, 0.6581, 0.6578, 0.6574, 0.6532, 0.6502, 0.6514, 0.6514,
                        0.6507, 0.651, 0.6489, 0.6424, 0.6406, 0.6382, 0.6382, 0.6341, 0.6344, 0.6378,
                        0.6439, 0.6478, 0.6481, 0.6481, 0.6494, 0.6438, 0.6377, 0.6329, 0.6336, 0.6333,
                        0.6333, 0.633, 0.6371, 0.6403, 0.6396, 0.6364, 0.6356, 0.6356, 0.6368, 0.6357,
                        0.6354, 0.632, 0.6332, 0.6328, 0.6331, 0.6342, 0.6321, 0.6302, 0.6278, 0.6308,
                        0.6324, 0.6324, 0.6307, 0.6277, 0.6269, 0.6335, 0.6392, 0.64, 0.6401, 0.6396,
                        0.6407, 0.6423, 0.6429, 0.6472, 0.6485, 0.6486, 0.6467, 0.6444, 0.6467, 0.6509,
                        0.6478, 0.6461, 0.6461, 0.6468, 0.6449, 0.647, 0.6461, 0.6452, 0.6422, 0.6422,
                        0.6425, 0.6414, 0.6366, 0.6346, 0.635, 0.6346, 0.6346, 0.6343, 0.6346, 0.6379,
                        0.6416, 0.6442, 0.6431, 0.6431, 0.6435, 0.644, 0.6473, 0.6469, 0.6386, 0.6356,
                        0.634, 0.6346, 0.643, 0.6452, 0.6467, 0.6506, 0.6504, 0.6503, 0.6481, 0.6451,
                        0.645, 0.6441, 0.6414, 0.6409, 0.6409, 0.6428, 0.6431, 0.6418, 0.6371, 0.6349,
                        0.6333, 0.6334, 0.6338, 0.6342, 0.632, 0.6318, 0.637, 0.6368, 0.6368, 0.6383,
                        0.6371, 0.6371, 0.6355, 0.632, 0.6277, 0.6276, 0.6291, 0.6274, 0.6293, 0.6311,
                        0.631, 0.6312, 0.6312, 0.6304, 0.6294, 0.6348, 0.6378, 0.6368, 0.6368, 0.6368,
                        0.636, 0.637, 0.6418, 0.6411, 0.6435, 0.6427, 0.6427, 0.6419, 0.6446, 0.6468,
                        0.6487, 0.6594, 0.6666, 0.6666, 0.6678, 0.6712, 0.6705, 0.6718, 0.6784, 0.6811,
                        0.6811, 0.6794, 0.6804, 0.6781, 0.6756, 0.6735, 0.6763, 0.6762, 0.6777, 0.6815,
                        0.6802, 0.678, 0.6796, 0.6817, 0.6817, 0.6832, 0.6877, 0.6912, 0.6914, 0.7009,
                        0.7012, 0.701, 0.7005, 0.7076, 0.7087, 0.717, 0.7105, 0.7031, 0.7029, 0.7006,
                        0.7035, 0.7045, 0.6956, 0.6988, 0.6915, 0.6914, 0.6859, 0.6778, 0.6815, 0.6815,
                        0.6843, 0.6846, 0.6846, 0.6923, 0.6997, 0.7098, 0.7188, 0.7232, 0.7262, 0.7266,
                        0.7359, 0.7368, 0.7337, 0.7317, 0.7387, 0.7467, 0.7461, 0.7366, 0.7319, 0.7361,
                        0.7437, 0.7432, 0.7461, 0.7461, 0.7454, 0.7549, 0.7742, 0.7801, 0.7903, 0.7876,
                        0.7928, 0.7991, 0.8007, 0.7823, 0.7661, 0.785, 0.7863, 0.7862, 0.7821, 0.7858,
                        0.7731, 0.7779, 0.7844, 0.7866, 0.7864, 0.7788, 0.7875, 0.7971, 0.8004, 0.7857,
                        0.7932, 0.7938, 0.7927, 0.7918, 0.7919, 0.7989, 0.7988, 0.7949, 0.7948, 0.7882,
                        0.7745, 0.771, 0.775, 0.7791, 0.7882, 0.7882, 0.7899, 0.7905, 0.7889, 0.7879,
                        0.7855, 0.7866, 0.7865, 0.7795, 0.7758, 0.7717, 0.761, 0.7497, 0.7471, 0.7473,
                        0.7407, 0.7288, 0.7074, 0.6927, 0.7083, 0.7191, 0.719, 0.7153, 0.7156, 0.7158,
                        0.714, 0.7119, 0.7129, 0.7129, 0.7049, 0.7095
                    ]
                }]
            });
        }
    }

    var initMemoryChart = function(){
        if($('div.Device-Hard-Chart-Memory').length>0){
            $('div.Device-Hard-Chart-Memory').highcharts({
                chart: {
                    zoomType: 'x',
                    spacingRight: 20,
                    height:120,
                    width:270
                },
                credits:{enabled:false},
                title: {
                    text: '内存负载时势图',
                    style:'font-size:12px'
                },
                xAxis: {
                    type: 'datetime',
                    maxZoom: 14 * 24 * 3600000, // fourteen days
                    title: {
                        enabled:false
                    }
                },
                yAxis: {
                    title: {
                        enabled:false
                    }
                },
                tooltip: {
                    shared: true
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        lineWidth: 1,
                        marker: {
                            enabled: false
                        },
                        shadow: false,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },

                series: [{
                    type: 'area',
                    name: 'USD to EUR',
                    pointInterval: 24 * 3600 * 1000,
                    pointStart: Date.UTC(2006, 0, 01),
                    data: [
                        0.8446, 0.8445, 0.8444, 0.8451,    0.8418, 0.8264,    0.8258, 0.8232,    0.8233, 0.8258,
                        0.8283, 0.8278, 0.8256, 0.8292,    0.8239, 0.8239,    0.8245, 0.8265,    0.8261, 0.8269,
                        0.8273, 0.8244, 0.8244, 0.8172,    0.8139, 0.8146,    0.8164, 0.82,    0.8269, 0.8269,
                        0.8269, 0.8258, 0.8247, 0.8286,    0.8289, 0.8316,    0.832, 0.8333,    0.8352, 0.8357,
                        0.8355, 0.8354, 0.8403, 0.8403,    0.8406, 0.8403,    0.8396, 0.8418,    0.8409, 0.8384,
                        0.8386, 0.8372, 0.839, 0.84, 0.8389, 0.84, 0.8423, 0.8423, 0.8435, 0.8422,
                        0.838, 0.8373, 0.8316, 0.8303,    0.8303, 0.8302,    0.8369, 0.84, 0.8385, 0.84,
                        0.8401, 0.8402, 0.8381, 0.8351,    0.8314, 0.8273,    0.8213, 0.8207,    0.8207, 0.8215,
                        0.8242, 0.8273, 0.8301, 0.8346,    0.8312, 0.8312,    0.8312, 0.8306,    0.8327, 0.8282,
                        0.824, 0.8255, 0.8256, 0.8273, 0.8209, 0.8151, 0.8149, 0.8213, 0.8273, 0.8273,
                        0.8261, 0.8252, 0.824, 0.8262, 0.8258, 0.8261, 0.826, 0.8199, 0.8153, 0.8097,
                        0.8101, 0.8119, 0.8107, 0.8105,    0.8084, 0.8069,    0.8047, 0.8023,    0.7965, 0.7919,
                        0.7921, 0.7922, 0.7934, 0.7918,    0.7915, 0.787, 0.7861, 0.7861, 0.7853, 0.7867,
                        0.7827, 0.7834, 0.7766, 0.7751, 0.7739, 0.7767, 0.7802, 0.7788, 0.7828, 0.7816,
                        0.7829, 0.783, 0.7829, 0.7781, 0.7811, 0.7831, 0.7826, 0.7855, 0.7855, 0.7845,
                        0.7798, 0.7777, 0.7822, 0.7785, 0.7744, 0.7743, 0.7726, 0.7766, 0.7806, 0.785,
                        0.7907, 0.7912, 0.7913, 0.7931, 0.7952, 0.7951, 0.7928, 0.791, 0.7913, 0.7912,
                        0.7941, 0.7953, 0.7921, 0.7919, 0.7968, 0.7999, 0.7999, 0.7974, 0.7942, 0.796,
                        0.7969, 0.7862, 0.7821, 0.7821, 0.7821, 0.7811, 0.7833, 0.7849, 0.7819, 0.7809,
                        0.7809, 0.7827, 0.7848, 0.785, 0.7873, 0.7894, 0.7907, 0.7909, 0.7947, 0.7987,
                        0.799, 0.7927, 0.79, 0.7878, 0.7878, 0.7907, 0.7922, 0.7937, 0.786, 0.787,
                        0.7838, 0.7838, 0.7837, 0.7836, 0.7806, 0.7825, 0.7798, 0.777, 0.777, 0.7772,
                        0.7793, 0.7788, 0.7785, 0.7832, 0.7865, 0.7865, 0.7853, 0.7847, 0.7809, 0.778,
                        0.7799, 0.78, 0.7801, 0.7765, 0.7785, 0.7811, 0.782, 0.7835, 0.7845, 0.7844,
                        0.782, 0.7811, 0.7795, 0.7794, 0.7806, 0.7794, 0.7794, 0.7778, 0.7793, 0.7808,
                        0.7824, 0.787, 0.7894, 0.7893, 0.7882, 0.7871, 0.7882, 0.7871, 0.7878, 0.79,
                        0.7901, 0.7898, 0.7879, 0.7886, 0.7858, 0.7814, 0.7825, 0.7826, 0.7826, 0.786,
                        0.7878, 0.7868, 0.7883, 0.7893, 0.7892, 0.7876, 0.785, 0.787, 0.7873, 0.7901,
                        0.7936, 0.7939, 0.7938, 0.7956, 0.7975, 0.7978, 0.7972, 0.7995, 0.7995, 0.7994,
                        0.7976, 0.7977, 0.796, 0.7922, 0.7928, 0.7929, 0.7948, 0.797, 0.7953, 0.7907,
                        0.7872, 0.7852, 0.7852, 0.786, 0.7862, 0.7836, 0.7837, 0.784, 0.7867, 0.7867,
                        0.7869, 0.7837, 0.7827, 0.7825, 0.7779, 0.7791, 0.779, 0.7787, 0.78, 0.7807,
                        0.7803, 0.7817, 0.7799, 0.7799, 0.7795, 0.7801, 0.7765, 0.7725, 0.7683, 0.7641,
                        0.7639, 0.7616, 0.7608, 0.759, 0.7582, 0.7539, 0.75, 0.75, 0.7507, 0.7505,
                        0.7516, 0.7522, 0.7531, 0.7577, 0.7577, 0.7582, 0.755, 0.7542, 0.7576, 0.7616,
                        0.7648, 0.7648, 0.7641, 0.7614, 0.757, 0.7587, 0.7588, 0.762, 0.762, 0.7617,
                        0.7618, 0.7615, 0.7612, 0.7596, 0.758, 0.758, 0.758, 0.7547, 0.7549, 0.7613,
                        0.7655, 0.7693, 0.7694, 0.7688, 0.7678, 0.7708, 0.7727, 0.7749, 0.7741, 0.7741,
                        0.7732, 0.7727, 0.7737, 0.7724, 0.7712, 0.772, 0.7721, 0.7717, 0.7704, 0.769,
                        0.7711, 0.774, 0.7745, 0.7745, 0.774, 0.7716, 0.7713, 0.7678, 0.7688, 0.7718,
                        0.7718, 0.7728, 0.7729, 0.7698, 0.7685, 0.7681, 0.769, 0.769, 0.7698, 0.7699,
                        0.7651, 0.7613, 0.7616, 0.7614, 0.7614, 0.7607, 0.7602, 0.7611, 0.7622, 0.7615,
                        0.7598, 0.7598, 0.7592, 0.7573, 0.7566, 0.7567, 0.7591, 0.7582, 0.7585, 0.7613,
                        0.7631, 0.7615, 0.76, 0.7613, 0.7627, 0.7627, 0.7608, 0.7583, 0.7575, 0.7562,
                        0.752, 0.7512, 0.7512, 0.7517, 0.752, 0.7511, 0.748, 0.7509, 0.7531, 0.7531,
                        0.7527, 0.7498, 0.7493, 0.7504, 0.75, 0.7491, 0.7491, 0.7485, 0.7484, 0.7492,
                        0.7471, 0.7459, 0.7477, 0.7477, 0.7483, 0.7458, 0.7448, 0.743, 0.7399, 0.7395,
                        0.7395, 0.7378, 0.7382, 0.7362, 0.7355, 0.7348, 0.7361, 0.7361, 0.7365, 0.7362,
                        0.7331, 0.7339, 0.7344, 0.7327, 0.7327, 0.7336, 0.7333, 0.7359, 0.7359, 0.7372,
                        0.736, 0.736, 0.735, 0.7365, 0.7384, 0.7395, 0.7413, 0.7397, 0.7396, 0.7385,
                        0.7378, 0.7366, 0.74, 0.7411, 0.7406, 0.7405, 0.7414, 0.7431, 0.7431, 0.7438,
                        0.7443, 0.7443, 0.7443, 0.7434, 0.7429, 0.7442, 0.744, 0.7439, 0.7437, 0.7437,
                        0.7429, 0.7403, 0.7399, 0.7418, 0.7468, 0.748, 0.748, 0.749, 0.7494, 0.7522,
                        0.7515, 0.7502, 0.7472, 0.7472, 0.7462, 0.7455, 0.7449, 0.7467, 0.7458, 0.7427,
                        0.7427, 0.743, 0.7429, 0.744, 0.743, 0.7422, 0.7388, 0.7388, 0.7369, 0.7345,
                        0.7345, 0.7345, 0.7352, 0.7341, 0.7341, 0.734, 0.7324, 0.7272, 0.7264, 0.7255,
                        0.7258, 0.7258, 0.7256, 0.7257, 0.7247, 0.7243, 0.7244, 0.7235, 0.7235, 0.7235,
                        0.7235, 0.7262, 0.7288, 0.7301, 0.7337, 0.7337, 0.7324, 0.7297, 0.7317, 0.7315,
                        0.7288, 0.7263, 0.7263, 0.7242, 0.7253, 0.7264, 0.727, 0.7312, 0.7305, 0.7305,
                        0.7318, 0.7358, 0.7409, 0.7454, 0.7437, 0.7424, 0.7424, 0.7415, 0.7419, 0.7414,
                        0.7377, 0.7355, 0.7315, 0.7315, 0.732, 0.7332, 0.7346, 0.7328, 0.7323, 0.734,
                        0.734, 0.7336, 0.7351, 0.7346, 0.7321, 0.7294, 0.7266, 0.7266, 0.7254, 0.7242,
                        0.7213, 0.7197, 0.7209, 0.721, 0.721, 0.721, 0.7209, 0.7159, 0.7133, 0.7105,
                        0.7099, 0.7099, 0.7093, 0.7093, 0.7076, 0.707, 0.7049, 0.7012, 0.7011, 0.7019,
                        0.7046, 0.7063, 0.7089, 0.7077, 0.7077, 0.7077, 0.7091, 0.7118, 0.7079, 0.7053,
                        0.705, 0.7055, 0.7055, 0.7045, 0.7051, 0.7051, 0.7017, 0.7, 0.6995, 0.6994,
                        0.7014, 0.7036, 0.7021, 0.7002, 0.6967, 0.695, 0.695, 0.6939, 0.694, 0.6922,
                        0.6919, 0.6914, 0.6894, 0.6891, 0.6904, 0.689, 0.6834, 0.6823, 0.6807, 0.6815,
                        0.6815, 0.6847, 0.6859, 0.6822, 0.6827, 0.6837, 0.6823, 0.6822, 0.6822, 0.6792,
                        0.6746, 0.6735, 0.6731, 0.6742, 0.6744, 0.6739, 0.6731, 0.6761, 0.6761, 0.6785,
                        0.6818, 0.6836, 0.6823, 0.6805, 0.6793, 0.6849, 0.6833, 0.6825, 0.6825, 0.6816,
                        0.6799, 0.6813, 0.6809, 0.6868, 0.6933, 0.6933, 0.6945, 0.6944, 0.6946, 0.6964,
                        0.6965, 0.6956, 0.6956, 0.695, 0.6948, 0.6928, 0.6887, 0.6824, 0.6794, 0.6794,
                        0.6803, 0.6855, 0.6824, 0.6791, 0.6783, 0.6785, 0.6785, 0.6797, 0.68, 0.6803,
                        0.6805, 0.676, 0.677, 0.677, 0.6736, 0.6726, 0.6764, 0.6821, 0.6831, 0.6842,
                        0.6842, 0.6887, 0.6903, 0.6848, 0.6824, 0.6788, 0.6814, 0.6814, 0.6797, 0.6769,
                        0.6765, 0.6733, 0.6729, 0.6758, 0.6758, 0.675, 0.678, 0.6833, 0.6856, 0.6903,
                        0.6896, 0.6896, 0.6882, 0.6879, 0.6862, 0.6852, 0.6823, 0.6813, 0.6813, 0.6822,
                        0.6802, 0.6802, 0.6784, 0.6748, 0.6747, 0.6747, 0.6748, 0.6733, 0.665, 0.6611,
                        0.6583, 0.659, 0.659, 0.6581, 0.6578, 0.6574, 0.6532, 0.6502, 0.6514, 0.6514,
                        0.6507, 0.651, 0.6489, 0.6424, 0.6406, 0.6382, 0.6382, 0.6341, 0.6344, 0.6378,
                        0.6439, 0.6478, 0.6481, 0.6481, 0.6494, 0.6438, 0.6377, 0.6329, 0.6336, 0.6333,
                        0.6333, 0.633, 0.6371, 0.6403, 0.6396, 0.6364, 0.6356, 0.6356, 0.6368, 0.6357,
                        0.6354, 0.632, 0.6332, 0.6328, 0.6331, 0.6342, 0.6321, 0.6302, 0.6278, 0.6308,
                        0.6324, 0.6324, 0.6307, 0.6277, 0.6269, 0.6335, 0.6392, 0.64, 0.6401, 0.6396,
                        0.6407, 0.6423, 0.6429, 0.6472, 0.6485, 0.6486, 0.6467, 0.6444, 0.6467, 0.6509,
                        0.6478, 0.6461, 0.6461, 0.6468, 0.6449, 0.647, 0.6461, 0.6452, 0.6422, 0.6422,
                        0.6425, 0.6414, 0.6366, 0.6346, 0.635, 0.6346, 0.6346, 0.6343, 0.6346, 0.6379,
                        0.6416, 0.6442, 0.6431, 0.6431, 0.6435, 0.644, 0.6473, 0.6469, 0.6386, 0.6356,
                        0.634, 0.6346, 0.643, 0.6452, 0.6467, 0.6506, 0.6504, 0.6503, 0.6481, 0.6451,
                        0.645, 0.6441, 0.6414, 0.6409, 0.6409, 0.6428, 0.6431, 0.6418, 0.6371, 0.6349,
                        0.6333, 0.6334, 0.6338, 0.6342, 0.632, 0.6318, 0.637, 0.6368, 0.6368, 0.6383,
                        0.6371, 0.6371, 0.6355, 0.632, 0.6277, 0.6276, 0.6291, 0.6274, 0.6293, 0.6311,
                        0.631, 0.6312, 0.6312, 0.6304, 0.6294, 0.6348, 0.6378, 0.6368, 0.6368, 0.6368,
                        0.636, 0.637, 0.6418, 0.6411, 0.6435, 0.6427, 0.6427, 0.6419, 0.6446, 0.6468,
                        0.6487, 0.6594, 0.6666, 0.6666, 0.6678, 0.6712, 0.6705, 0.6718, 0.6784, 0.6811,
                        0.6811, 0.6794, 0.6804, 0.6781, 0.6756, 0.6735, 0.6763, 0.6762, 0.6777, 0.6815,
                        0.6802, 0.678, 0.6796, 0.6817, 0.6817, 0.6832, 0.6877, 0.6912, 0.6914, 0.7009,
                        0.7012, 0.701, 0.7005, 0.7076, 0.7087, 0.717, 0.7105, 0.7031, 0.7029, 0.7006,
                        0.7035, 0.7045, 0.6956, 0.6988, 0.6915, 0.6914, 0.6859, 0.6778, 0.6815, 0.6815,
                        0.6843, 0.6846, 0.6846, 0.6923, 0.6997, 0.7098, 0.7188, 0.7232, 0.7262, 0.7266,
                        0.7359, 0.7368, 0.7337, 0.7317, 0.7387, 0.7467, 0.7461, 0.7366, 0.7319, 0.7361,
                        0.7437, 0.7432, 0.7461, 0.7461, 0.7454, 0.7549, 0.7742, 0.7801, 0.7903, 0.7876,
                        0.7928, 0.7991, 0.8007, 0.7823, 0.7661, 0.785, 0.7863, 0.7862, 0.7821, 0.7858,
                        0.7731, 0.7779, 0.7844, 0.7866, 0.7864, 0.7788, 0.7875, 0.7971, 0.8004, 0.7857,
                        0.7932, 0.7938, 0.7927, 0.7918, 0.7919, 0.7989, 0.7988, 0.7949, 0.7948, 0.7882,
                        0.7745, 0.771, 0.775, 0.7791, 0.7882, 0.7882, 0.7899, 0.7905, 0.7889, 0.7879,
                        0.7855, 0.7866, 0.7865, 0.7795, 0.7758, 0.7717, 0.761, 0.7497, 0.7471, 0.7473,
                        0.7407, 0.7288, 0.7074, 0.6927, 0.7083, 0.7191, 0.719, 0.7153, 0.7156, 0.7158,
                        0.714, 0.7119, 0.7129, 0.7129, 0.7049, 0.7095
                    ]
                }]
            });
        }
    }

    var onSettingsDevice = function(){
        $('a#Device-Settings-Done').click(function(){
            var content = '';
            var error   = '';
            var id      = $(this).attr('data-device-id');
            $.ajax({
                url:'/device/devicesettings.htm',
                type:'GET',
                dataType:'HTML',
                async:false,
                //data:{'deviceid':id},
                success:function(data){
                    if(data.result=='FAIL'){
                        error = data.message;
                    }else{
                        content = data;
                    }
                }
            });

            if(content!=''){
                onOpenDialog('Dailogin:Device:Setting', '设备设置', content,{ok:function(){onSetDevice();return false;}});
                
            }else {
                onAlertError(error);
                return false;
            }
        });
    }
    
    var onSettingsDeviceSync = function(){
        $('a#Device-Settings-Sync').click(function(){
            var content = 'content';
            var error   = '';
            $.ajax({
                url:'/device/synchrodevices.htm',
                type:'GET',
                dataType:'HTML',
                async:false,
                success:function(data){
                    if(data.result=='FAIL'){
                        error = data.message;
                    }else{
                        content = data;
                    }
                }
            });
            if(content!=''){               
                var d = dialog({
                	id: 'Dailogin:Device:SettingSync',
                    title: '同步设置',
                    content: content,
                    okValue: '确定',
                    ok: function(){onSetDeviceSyn();return false;},
                    
                    cancelValue: '取消',
                    cancel: function () {},
                    width:720,
                    height:545,
                    zIndex:20,
                    skin:'ChinaNet-Dialog'
                });
                d.showModal();
                //return false;
            }else {
                onAlertError(error);
                return false;
            }
        });
    }
    
    var onSettingsDeviceTransfer = function(){
        $('a#Device-Settings-Transfer').click(function(){
        	if(device_info.accountId != 1) {
        		onConfirmDialog('<p>您确定要修改该设备的所属商户吗？</p><p>该设备已属于某一商户</p>', 
        				function(){modifyDeviceAccountOK()}, function(){});
        	} else {
        		modifyDeviceAccountOK();
        	}
        });
    }
    function modifyDeviceAccountOK() {
    	$.ajax({
    		url : '/system/devicetomerchantpage.htm?deviceId='+device_info.deviceId,
    		type : 'GET',
    		data : device_info.deviceId,
    		dataType : 'HTML',
    		async : false,
    		success : function(data) {
    			if(data.result == 'FAIL') {
    				error = data.message;
    			} else {
    				content = data;
    				loadDeviceInfo();
    			}
    		}
    	});
    	var d = dialog({
    		id: 'Dailogin:Device:toMerchant',
    		title: '分配给商户',
    		content: content,
    		cancelValue: '取消',
    		cancel: function () {},
    		width:720,
    		height:545,
    		zIndex:20,
    		skin:'ChinaNet-Dialog'
    	});
    		d.showModal();
    }
    var onSetDeviceSyn = function(){	
    	if(select_device_ids.length>0){
	    	var param = null;
	    	param = {
	   				'devicelist' : select_device_ids.join(","),
					'devicename' : _devicename,
					'configitems': JSON.stringify(_configitemsjs)
	       		};
	    	$.ajax({
	            type: 'POST',
	            dataType: 'json',
	            url: '/device/devicesettings.htm',
	            data: param,
	            success: function (data) {
	                if (data.result == 'OK') {
	                	onAlertError("同步设备配置成功","ok");
	                	//关闭Modal-刷新设备详情---
					} else { 			
						onAlertError(data.message);
						return false;
					}
	                
	            },
	            error: function (data) {
	            	onAlertError("同步设备配置失败!");
					return false;
	            }
	        });
	    	dialog.list['Dailogin:Device:SettingSync'].remove().close();
    	}else{
    		onAlertError("没有选择设备!",'ok');
    	}
    }
    var onRestartDevice = function(){
    	$('a#Device-Settings-RestartDevice').click(function(){
    		$.ajax({
				type : 'POST',
				dataType : 'json',
				url : '/api10/devicereboot.htm',
				data : {
					'dev_id' : __DATA_PUBLIC_KEY
				},
				success : function(data) {
					if (data.result != 'FAIL') {						
						onAlertError("设备正在重启......","ok");
					} else {	    
 					    onAlertError(data.message);
						return false;
					}

				},
				error : function(data) {
					onAlertError("设备暂时无法重启");
					return false;
				}
			});
    	});
    }
    var onRestartPortal = function(){
    	$('a#Device-Settings-RestartPortal').click(function(){
    		$.ajax({
				type : 'POST',
				dataType : 'json',
				url : '/api10/deviceportalrestart.htm',
				data : {
					'dev_id' : __DATA_PUBLIC_KEY
				},
				success : function(data) {
					if (data.result != 'FAIL') {
						onAlertError("设备Portal正在重启......","ok");
					} else { 					    
 					    onAlertError("设备Portal暂时无法重启");
						return false;
					}
				},
				error : function(data) {
					onAlertError("设备Portal暂时无法重启");
					return false;
				}
			});
    	});
    }
    var onSetDevice = function(){
    	var configitemsjs = {ssid: $("#inputSSID").val(), password: $("#inputpwd").val()};
    	var param = null;

    	if(!onCheckEmpty($("#inputSBName").val())){
            onAlertErrorTip('请输入设备名称', document.getElementById('inputSBName'));
            return false;
        }

        if(!onCheckEmpty($("#inputSSID").val())){
            onAlertErrorTip('请输入SSID', document.getElementById('inputSSID'))
            return false;
        }
        _devicename = $("#inputSBName").val();
        _configitemsjs = configitemsjs;
    	param = {
       				'deviceid' : __DATA_PUBLIC_KEY,
    				'devicename' : $("#inputSBName").val(),
    				'configitems': JSON.stringify(configitemsjs),
    				'component_id': $("#converid").val()
           		};

            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/device/devicesettings.htm',
                data: param,
                success: function (data) {
                    if (data.result == 'OK') {
                    	onAlertError("设备配置成功","ok");
                    	dialog.list['Dailogin:Device:Setting'].remove().close();
                    	loadDeviceInfo();
                    	//关闭Modal-刷新设备详情---
    				} else {
    					onAlertError(data.message);
    					return false;
    				}

                },
                error: function (data) {
                	onAlertError("设备配置失败!");
    				return false;
                }
            });

    }
    
	return {init:function(){
		userSearchHandler.setSearchParemeter('deviceId', __DATA_PUBLIC_KEY);
		userSearchHandler.searchWithPreload();	
		DEVICE_LIST_REFRESH_TIMER.stopTimer();
		loadDeviceInfo();
		//initMemoryChart();
        //initCPUChart();
        onSettingsDevice();
        onSettingsDeviceSync();
        onSettingsDeviceTransfer();
        onRestartDevice();
        onRestartPortal();
	}}
}();

function generateUserDeviceListHtml(dataRecords){
	var userListHtml = "";
	if (dataRecords.length > 0) {
		for ( var i = 0; i < dataRecords.length; i++) {
			/*var userid = dataRecords[i].id;
			var merchantname = dataRecords[i].merchantName;
			var deviceid = dataRecords[i].deviceId;
			var devicename = isNotEmptyString(dataRecords[i].deviceName)?dataRecords[i].deviceName:"";
			var logindatetime = dataRecords[i].loginDatetime;
			var status = dataRecords[i].status;
			var onlineStatus = dataRecords[i].onlineStatus;
			var totalUpTraffic = dataRecords[i].totalUpTraffic;
			var totalDwTraffic = dataRecords[i].totalDwTraffic;
			
			var authId = dataRecords[i].authId;
			var usermemo = dataRecords[i].memo;
            var terminalType = isNotEmptyString(dataRecords[i].terminalType)?dataRecords[i].terminalType:"";
            var browserType = isNotEmptyString(dataRecords[i].browserType)?dataRecords[i].browserType:"";
            var mac = dataRecords[i].mac;
            if (dataRecords[i].authType == "OPTION") {
                authId = "匿名用户";
            }*/
            
            /***new start***/
            var authId ,totalUpTraffic=0 ,totalDwTraffic=0 ,mac='' ,browserType='' ,merchantname='' ,terminalType='' ,ip='';
            var logContentTemp = null;
            if(isNotEmptyString(dataRecords[i].logContent)){
            	logContentTemp = JSON.parse(dataRecords[i].logContent);
            	authId = logContentTemp.user_id;
            	totalUpTraffic = logContentTemp.outgoing;
            	totalDwTraffic = logContentTemp.incoming;
            	mac = logContentTemp.mac.toUpperCase();
            	ip = logContentTemp.ip;
            }
            var userid = dataRecords[i].id;
            var status = dataRecords[i].status;
            var logindatetime = dataRecords[i].loginDatetime;
            var deviceid = dataRecords[i].deviceId;
            browserType = isNotEmptyString(dataRecords[i].browserType)?dataRecords[i].browserType:"";
            terminalType = isNotEmptyString(dataRecords[i].terminalType)?dataRecords[i].terminalType:"";
            if (dataRecords[i].authType == "OPTION") {
                authId = "匿名用户";
            }
                           
			userListHtml += "<tr class='ChinaNet-Table-Body' >";
			userListHtml += "<td><span class='Table-Data-Name'>" + authId + "</span>";
			userListHtml +="<span class='Table-Data-Text'>"+terminalType+" "+browserType+"</span>";
			userListHtml += "</td>";				
			userListHtml += "<td><span class='Table-Data-Name'>" + deviceid + "</span>";
			userListHtml +="<span class='Table-Data-Text'>"+merchantname+"</span></td>";
			
			userListHtml += "<td><span class='Table-Data-Name'>" + mac + "</span><span class='Table-Data-Text'>"+ip+"</span></td>";
			userListHtml += "<td>" + logindatetime + "</td>";
		
			userListHtml += "<td> <span class='Table-Data-Status "+ onlineStatusSpan(status) +"'></span></td>";
			/*userListHtml += "<td id='user_status_" + userid + "'>" + statusUserSpan(status) + "</td>";*/
			userListHtml += "<td><span class='Table-Data-Flow Table-Flow-Up'><span></span>"+ trafficFormatter(totalUpTraffic) +"</span>";
			userListHtml += "<span class='Table-Data-Flow Table-Flow-Down'><span></span>"+ trafficFormatter(totalDwTraffic) +"</span></td>";
			userListHtml += "<td class='ChinaNet-Form-Sheet' id='user_opt_btn_" + userid + "'>";
			//userListHtml += generateUserOptBtn(userid, deviceid, status); 
			userListHtml += "</td>";
			userListHtml += "</tr>";

		}
	}
	else{
		$(".ChinaNet-Page-Table").hide();
	}
	return userListHtml;
}
function onlineStatusSpan(onlineStatus) {
	var statuscss="";
	if(onlineStatus != null){
		if (onlineStatus.toUpperCase() == "ONLINE") {
			statuscss += "Table-Status-Online";
		}
		else if(onlineStatus.toUpperCase() == "LOCKED"){
			statuscss += "Table-Status-Locked";
		}else{
			statuscss += "Table-Status-Offline";
		}
	}
	return statuscss;
}
function statusUserSpan(status)
{
	var statusHtml="";
	if(status != null){
		if (status == "LOCKED") {
			statusHtml += "<span class='Table-Data-Status-Photo Table-Flow-Locked'></span>";
		}
		else{
			statusHtml += "<span class='Table-Data-Status-Photo Table-Flow-Unlocked'></span>";
		}
	}
	return statusHtml;
}
function MemfreeFormatter(val) {
	if (val == '--')
		return val;
	else if (val > 1024*1024)
		return Math.round(val / (1024*1024)) + " GB";
	else if (val > 1024)
	      return Math.round(val / 1024) + " MB";
    else
    	return val + " KB";
}
function loadDeviceInfo() {
	showLoading();
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : '/device/deviceinfo.htm',
		data : {
			'deviceId' : __DATA_PUBLIC_KEY
		},
		success : function(data) {
			if (data.result != 'FAIL' && data.deviceinfo != null) {
				if (data.deviceinfo != null) {
					generateDevInfoHtml(data.deviceinfo);//填充数据
					
				}
				if(data.deviceModel != null){
					generateDevModelHtml(data.deviceModel);
				}
			} else {
				closeLoading();
				onAlertError(data.message);
				return false;
			}
			closeLoading();
		},
		error : function(data) {
			closeLoading();	
			onAlertError('设备数据加载失败!');
			return false;
		}
	});
}
function generateDevModelHtml(ModelInfo){
	var modelhtml = "";
	if(ModelInfo != null){
		$("#cpuBrand").text(isNotEmptyString(ModelInfo.cpuBrand)?ModelInfo.cpuBrand:"");
		$("#cpuModel").text(isNotEmptyString(ModelInfo.cpuModel)?ModelInfo.cpuModel:"");
		$("#maxTurboFrequency").text(isNotEmptyString(ModelInfo.maxTurboFrequency)?ModelInfo.maxTurboFrequency:"");
		$("#totalMem").text(isNotEmptyString(ModelInfo.totalMem)?ModelInfo.totalMem+"MB":"");
	}
}
function generateDevInfoHtml(deviceInfo){
	device_info = deviceInfo;
	var devInfoHtml = "";

	if (deviceInfo != null) {
		var deviceid = deviceInfo.deviceId;
		var devicemodel = deviceInfo.model;
		var devicename = deviceInfo.name;
		_devicename = devicename;
		if(isNotEmptyString(deviceInfo.ssid)){
			devicename+=" (" + deviceInfo.ssid + ")";
		}
		_configitemsjs = {ssid: deviceInfo.ssid, password: ''};
		var registertime = deviceInfo.registerationDate;
		var location_full_address = deviceInfo.locationAdress;
		var merchant_name = deviceInfo.merchantName;
		var representitive_name = deviceInfo.representitiveName;
		var administrator = deviceInfo.administrator;
		var wanprotocol = deviceInfo.wanProtocol;
		var ssid = deviceInfo.ssid;
		var uptime = deviceInfo.uptime;
		var comversion = deviceInfo.componentVersion;
		var pubip="";
		if(deviceInfo.publicIp =="(null)"){
		   pubip == '( )';
		}
		else{
			 pubip = deviceInfo.publicIp;
		}
		
		
		var mac = deviceInfo.mac;
		var upstream = deviceInfo.upTraffic;
		var downstream = deviceInfo.downTraffic;
		var status = deviceInfo.status;
	
		if (status == "LOCKED") {
			//$("#lb_devStatus").addClass("label-warning");
			status="锁定";
		}
		else if(status == "OFFLINE"){				
			//$("#lb_devStatus").addClass("label-default");
			status="离线";
		}
		else{
			//$("#lb_devStatus").addClass("label-info");
			status="在线";
		}			
		$("#lb_devType").text(devicemodel);
		$("#lb_devID").text(deviceid);
		$("#lb_devName").text(devicename);
		$("#lb_devSSID").text(ssid);
		$("#lb_devRegtime").text(registertime);
		$("#lb_devUptime").text(uptime);
		$("#lb_devFAddr").text(location_full_address);
		$("#lb_devComversion").text(comversion);
		$("#lb_devMerName").text(merchant_name);
		$("#lb_devPubIp").text(pubip);
		$("#lb_devrepresentitiveName").text(representitive_name);
		$("#lb_devMac").text(mac);
		$("#lb_devAdmin").text(administrator);
		$("#lb_devUpstream").text(trafficFormatter(upstream));
		$("#lb_devwanprotocol").text(wanprotocol);
		$("#lb_devdownstream").text(trafficFormatter(downstream));
		$("#lb_devStatus").text(status);

		$("#spanDevid").text(deviceid);
		$("#spanMerName").text(merchant_name);
		$("#spanaddr").text(location_full_address);
		$("#spandevName").text(devicename);
		$("#spanupstream").text(trafficFormatter(upstream));
		$("#spandownstream").text(trafficFormatter(downstream));
					
		$("#devsethref").attr("href", "javascript:Devsetting('" + deviceid + "')");
		$("#sp_deviceid").html(devicename);
        $('a.Device-Settings-Button').attr('data-device-id', deviceid);
        $("#span_curUserCount").text(deviceInfo.curUserCount);
		$("#span_allUserCount").text(deviceInfo.allUserCount);
		$("#sysMemfree").text(isNotEmptyString(deviceInfo.sysMemfree)?MemfreeFormatter(deviceInfo.sysMemfree):"");
		$("#sysLoad").text(isNotEmptyString(deviceInfo.sysLoad)?deviceInfo.sysLoad:"");
		//sysMemfree
	}
}