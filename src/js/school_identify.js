var ip_range = [
	['202.113.16.0','202.113.31.255',1,'南开大学'],
	['202.113.224.0','202.113.239.255',1,'南开大学'],
	['202.113.0.0','202.113.15.255',2,'天津大学'],
	['202.113.176.0','202.113.191.255',2,'天津大学'],
]

var ipgetjs_url = 'http://ipget.sinaapp.com'

exports.get_school_id = function(onget) {
	var script = document.createElement('script')
	script.setAttribute('src', ipgetjs_url)
	script.onload = function(){
		for(var i in ip_range) {
			if(is_ip_in_range(MY_IP,ip_range[i].slice(0,2))) {
				onget(ip_range[i][2],ip_range[i][3])
				break
			}
		}
		if(i==ip_range.length-1){
			onget(2,'未知学校')
		}
	}
	script.onerror = function(){
		onget(2,'未知学校')
	}
	document.getElementsByTagName('head')[0].appendChild(script)
}

function is_ip_in_range(ip,iprange) {
	var ip = ip.split('.')
	var ip_low = iprange[0].split('.')
	var ip_high = iprange[1].split('.')

	for(var i=0;i<4;i++) {
		if(parseInt(ip[i])<parseInt(ip_low[i]) || parseInt(ip[i])>parseInt(ip_high[i])) {
			return false
		}
	}
	return true
}