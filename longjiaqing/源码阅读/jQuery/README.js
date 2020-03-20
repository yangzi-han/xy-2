//此代码来自github里jQuery里test的jQuery.js
( function() {//这是一个自执行函数
	/* global loadTests: false */

	var dynamicImportSource, config, src,
		FILEPATH = "/test/jquery.js",//所在文件路径
		//document.getElementsByTagName( "script" )是一个对象而不是数组，最多算是一个伪数组，而且自身的原型链上也没有slice这个方法。[].slice.call()能将具有length属性的对象转成数组
		activeScript = [].slice.call( document.getElementsByTagName( "script" ), -1 )[ 0 ],
		parentUrl = activeScript && activeScript.src ?
			activeScript.src.replace( /[?#].*/, "" ) + FILEPATH.replace( /[^/]+/g, ".." ) + "/" :
			"../",//利用三元运算符进行判断 activeScript有值或者是 activeScript.src 有值 如果有的话将activeScript.src里面的#开头的替换成空字符
		QUnit = window.QUnit,
		require = window.require;

	function getQUnitConfig() {
		var config = Object.create( null );
		//Object.create()规范化原型式继承的。这个方法接收两个参数，一个是用作新对象原型的对象，和一个为新对象定义额外属性的（可选）对象。
		// 对于直接打开的iframe，默认为未统一jQuery
		if ( !QUnit ) {
			config.dev = true;
		} else {

			// QUnit.config是从QUnit.urlParams填充的，但只在开头填充
			//测试运行的。我们两个都要读。
			QUnit.config.urlConfig.forEach( function( entry ) {
				config[ entry.id ] = QUnit.config[ entry.id ] != null ?
					QUnit.config[ entry.id ] :
					QUnit.urlParams[ entry.id ];
			} );
		}

		return config;
	}

	// 定义控制jQuery加载方式的配置参数
	if ( QUnit ) {QUnit
		QUnit.config.urlConfig.push( {
			id: "esmodules",
			label: "Load as modules",
			tooltip: "Load the jQuery module file (and its dependencies)"
		}, {
			id: "amd",
			label: "Load with AMD",
			tooltip: "Load the AMD jQuery file (and its dependencies)"
		}, {
			id: "dev",
			label: "Load unminified",
			tooltip: "Load the development (unminified) jQuery file"
		} );
	}

	config = getQUnitConfig();

	src = config.dev ?
		"dist/jquery.js" :
		"dist/jquery.min.js";

	// 尊重加载在主窗口上的ES模块（通过在主窗口上看到QUnit进行检测）。
	// 这不适用于iframe，因为它们同步地期望jQuery在那里。
	if ( config.esmodules && QUnit ) {

		// 支持: IE 11+, 边缘 12 - 18+
		// IE/Edge不支持动态导入语法，因此会崩溃
		// 这里有一个语法错误.
		dynamicImportSource = "" +
			"import( `${ parentUrl }src/jquery.js` )\n" +
			"	.then( ( { default: jQuery } ) => {\n" +
			"		window.jQuery = jQuery;\n" +
			"		if ( typeof loadTests === \"function\" ) {\n" +
			"			// Include tests if specified\n" +
			"			loadTests();\n" +
			"		}\n" +
			"	} )\n" +
			"	.catch( error => {\n" +
			"		console.error( error );\n" +
			"		QUnit.done();\n" +
			"	} );";

		eval( dynamicImportSource );//eval()可以接受一个字符串str作为参数，并把这个参数作为脚本代码来执行。

	// 对AMD模块进行类似处理
	} else if ( config.amd && QUnit ) {
		require.config( {
			baseUrl: parentUrl
		} );
		src = "amd/jquery";

		// 如果指定，包括测试
		if ( typeof loadTests !== "undefined" ) {
			require( [ src ], loadTests );
		} else {
			require( [ src ] );
		}

	// 否则，同步加载
	} else {
		document.write( "<script id='jquery-js' nonce='jquery+hardcoded+nonce' src='" + parentUrl + src + "'><\x2Fscript>" );
	}

} )();
