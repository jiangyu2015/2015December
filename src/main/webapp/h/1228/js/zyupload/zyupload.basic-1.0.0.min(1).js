var ZYFILE = {
    fileInput: null,
    uploadInput: null,
    dragDrop: null,
    url: "",
    uploadFile: [],
    lastUploadFile: [],
    perUploadFile: [],
    fileNum: 0,
    filterFile: function(files) {
        return files
    },
    onSelect: function(selectFile, files) {},
    onDelete: function(file, files) {},
    onProgress: function(file, loaded, total) {},
    onSuccess: function(file, responseInfo) {},
    onFailure: function(file, responseInfo) {},
    onComplete: function(responseInfo) {},
    funDragHover: function(e) {
        e.stopPropagation();
        e.preventDefault();
        this[e.type === "dragover" ? "onDragOver": "onDragLeave"].call(e.target);
        return this
    },
    funGetFiles: function(e) {
        var self = this;
        this.funDragHover(e);
        var files = e.target.files || e.dataTransfer.files;
        self.lastUploadFile = this.uploadFile;
        this.uploadFile = this.uploadFile.concat(this.filterFile(files));
        var tmpFiles = [];
        var lArr = [];
        var uArr = [];
        $.each(self.lastUploadFile,
        function(k, v) {
            lArr.push(v.name)
        });
        $.each(self.uploadFile,
        function(k, v) {
            uArr.push(v.name)
        });
        $.each(uArr,
        function(k, v) {
            if ($.inArray(v, lArr) < 0) {
                tmpFiles.push(self.uploadFile[k])
            }
        });
        this.uploadFile = tmpFiles;
        this.funDealtFiles();
        return true
    },
    funDealtFiles: function() {
        var self = this;
        $.each(this.uploadFile,
        function(k, v) {
            v.index = self.fileNum;
            self.fileNum++
        });
        var selectFile = this.uploadFile;
        this.perUploadFile = this.perUploadFile.concat(this.uploadFile);
        this.uploadFile = this.lastUploadFile.concat(this.uploadFile);
        this.onSelect(selectFile, this.uploadFile);
        console.info("继续选择");
        console.info(this.uploadFile);
        return this
    },
    funDeleteFile: function(delFileIndex, isCb) {
        var self = this;
        var tmpFile = [];
        var delFile = this.perUploadFile[delFileIndex];
        $.each(this.uploadFile,
        function(k, v) {
            if (delFile != v) {
                tmpFile.push(v)
            }
        });
        this.uploadFile = tmpFile;
        if (isCb) {
            self.onDelete(delFile, this.uploadFile)
        }
        console.info("还剩这些文件没有上传:");
        console.info(this.uploadFile);
        return true
    },
    funUploadFiles: function() {
        var self = this;
        $.each(this.uploadFile,
        function(k, v) {
            self.funUploadFile(v)
        })
    },
    funUploadFile: function(file) {
        var self = this;
        var formdata = new FormData();
        formdata.append("file", file);
        if ($("#uploadTailor_" + file.index).length > 0) {
            formdata.append("tailor", $("#uploadTailor_" + file.index).attr("tailor"))
        }
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress",
        function(e) {
            self.onProgress(file, e.loaded, e.total)
        },
        false);
        xhr.addEventListener("load",
        function(e) {
            self.funDeleteFile(file.index, false);
            self.onSuccess(file, xhr.responseText);
            if (self.uploadFile.length == 0) {
                self.onComplete("全部完成")
            }
        },
        false);
        xhr.addEventListener("error",
        function(e) {
            self.onFailure(file, xhr.responseText)
        },
        false);
        xhr.open("POST", self.url, true);
        xhr.send(formdata)
    },
    funReturnNeedFiles: function() {
        return this.uploadFile
    },
    init: function() {
        var self = this;
        if (this.dragDrop) {
            this.dragDrop.addEventListener("dragover",
            function(e) {
                self.funDragHover(e)
            },
            false);
            this.dragDrop.addEventListener("dragleave",
            function(e) {
                self.funDragHover(e)
            },
            false);
            this.dragDrop.addEventListener("drop",
            function(e) {
                self.funGetFiles(e)
            },
            false)
        }
        if (self.fileInput) {
            this.fileInput.addEventListener("change",
            function(e) {
                self.funGetFiles(e)
            },
            false)
        }
        if (self.uploadInput) {
            this.uploadInput.addEventListener("click",
            function(e) {
                self.funUploadFiles(e)
            },
            false)
        }
    }
}; (function($, undefined) {
    $.fn.zyUpload = function(options, param) {
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == "string") {
            var fn = this[0][options];
            if ($.isFunction(fn)) {
                return fn.apply(this, otherArgs)
            } else {
                throw ("zyUpload - No such method: " + options)
            }
        }
        return this.each(function() {
            var para = {};
            var self = this;
            var defaults = {
                width: "100%",
                height: "auto",
                itemWidth: "140px",
                itemHeight: "120px",
                url: "/upload/UploadAction",
                fileType: [],
                fileSize: 51200000,
                multiple: true,
                dragDrop: false,
                tailor: false,
                del: true,
                finishDel: false,
                onSelect: function(selectFiles, allFiles) {},
                onDelete: function(file, files) {},
                onSuccess: function(file, response) {},
                onFailure: function(file, response) {},
                onComplete: function(response) {}
            };
            para = $.extend(defaults, options);
            this.init = function() {
                this.createHtml();
                this.createCorePlug()
            };
            this.createHtml = function() {
                var multiple = "";
                para.multiple ? multiple = "multiple": multiple = "";
                var html = "";
                if (para.dragDrop) {
                    html += '<form id="uploadForm" action="' + para.url + '" method="post" enctype="multipart/form-data">';
                    html += '	<div class="upload_box">';
                    html += '		<div class="upload_main">';
                    html += '			<div class="upload_choose">';
                    html += '				<div class="convent_choice">';
                    html += '					<div class="andArea">';
                    html += '						<div class="filePicker">点击选择文件</div>';
                    html += '						<input id="fileImage" type="file" size="30" name="fileselect[]" ' + multiple + ">";
                    html += "					</div>";
                    html += "				</div>";
                    html += '				<span id="fileDragArea" class="upload_drag_area">或者将文件拖到此处</span>';
                    html += "			</div>";
                    html += '			<div class="status_bar">';
                    html += '				<div id="status_info" class="info">选中0张文件，共0B。</div>';
                    html += '				<div class="btns">';
                    html += '					<div class="webuploader_pick">继续选择</div>';
                    html += '					<div class="upload_btn">开始上传</div>';
                    html += "				</div>";
                    html += "			</div>";
                    html += '			<div id="preview" class="upload_preview"></div>';
                    html += "		</div>";
                    html += '		<div class="upload_submit">';
                    html += '			<button type="button" id="fileSubmit" class="upload_submit_btn">确认上传文件</button>';
                    html += "		</div>";
                    html += '		<div id="uploadInf" class="upload_inf"></div>';
                    html += "	</div>";
                    html += "</form>"
                } else {
                    var imgWidth = parseInt(para.itemWidth.replace("px", "")) - 15;
                    html += '<form id="uploadForm" action="' + para.url + '" method="post" enctype="multipart/form-data">';
                    html += '	<div class="upload_box">';
                    html += '		<div class="upload_main single_main">';
                    html += '			<div class="status_bar">';
                    html += '				<div id="status_info" class="info">选中0张文件，共0B。</div>';
                    html += '				<div class="btns">';
                    html += '					<input id="fileImage" type="file" size="30" name="fileselect[]" ' + multiple + ">";
                    html += '					<div class="webuploader_pick">选择文件</div>';
                    html += '					<div class="upload_btn">开始上传</div>';
                    html += "				</div>";
                    html += "			</div>";
                    html += '			<div id="preview" class="upload_preview">';
                    html += '				<div class="add_upload">';
                    html += '					<a style="height:' + para.itemHeight + ";width:" + para.itemWidth + ';" title="点击添加文件" id="rapidAddImg" class="add_imgBox" href="javascript:void(0)">';
                    html += '						<div class="uploadImg" style="width:' + imgWidth + 'px">';
                    html += '							<img class="upload_image" src="zyupload/skins/images/add_img.png" style="width:expression(this.width > ' + imgWidth + " ? " + imgWidth + 'px : this.width)" />';
                    html += "						</div>";
                    html += "					</a>";
                    html += "				</div>";
                    html += "			</div>";
                    html += "		</div>";
                    html += '		<div class="upload_submit">';
                    html += '			<button type="button" id="fileSubmit" class="upload_submit_btn">确认上传文件</button>';
                    html += "		</div>";
                    html += '		<div id="uploadInf" class="upload_inf"></div>';
                    html += "	</div>";
                    html += "</form>"
                }
                $(self).append(html).css({
                    // "width": para.width,
                    // "height": para.height
                    "width":"100%",
                    "height":' auto'
                });
                this.addEvent()
            };
            this.funSetStatusInfo = function(files) {
                var size = 0;
                var num = files.length;
                $.each(files,
                function(k, v) {
                    size += v.size
                });
                if (size > 1024 * 1024) {
                    size = (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + "MB"
                } else {
                    size = (Math.round(size * 100 / 1024) / 100).toString() + "KB"
                }
                $("#status_info").html("选中" + num + "张文件，共" + size + "。")
            };
            this.funFilterEligibleFile = function(files) {
                var arrFiles = [];
                for (var i = 0,
                file; file = files[i]; i++) {
                    var newStr = file.name.split("").reverse().join("");
                    if (newStr.split(".")[0] != null) {
                        var type = newStr.split(".")[0].split("").reverse().join("");
                        if (jQuery.inArray(type, para.fileType) > -1) {
                            if (file.size >= para.fileSize) {
                                alert('您这个"' + file.name + '"文件大小过大')
                            } else {
                                arrFiles.push(file)
                            }
                        } else {
                            alert('您这个"' + file.name + '"上传类型不符合')
                        }
                    } else {
                        alert('您这个"' + file.name + '"没有类型, 无法识别')
                    }
                }
                return arrFiles
            };
            this.funDisposePreviewHtml = function(file, e) {
                var html = "";
                var imgWidth = parseInt(para.itemWidth.replace("px", "")) - 15;
                var imgHeight = parseInt(para.itemHeight.replace("px", "")) - 10;
                var editHtml = "";
                var delHtml = "";
                if (para.tailor) {
                    editHtml = '<span class="file_edit" data-index="' + file.index + '" title="编辑"></span>'
                }
                if (para.del) {
                    delHtml = '<span class="file_del" data-index="' + file.index + '" title="删除"></span>'
                }
                var newStr = file.name.split("").reverse().join("");
                var type = newStr.split(".")[0].split("").reverse().join("");
                var fileImgSrc = "zyupload/skins/images/fileType/";
                if (type == "rar") {
                    fileImgSrc = fileImgSrc + "rar.png"
                } else {
                    if (type == "zip") {
                        fileImgSrc = fileImgSrc + "zip.png"
                    } else {
                        if (type == "txt") {
                            fileImgSrc = fileImgSrc + "txt.png"
                        } else {
                            if (type == "ppt") {
                                fileImgSrc = fileImgSrc + "ppt.png"
                            } else {
                                if (type == "xls") {
                                    fileImgSrc = fileImgSrc + "xls.png"
                                } else {
                                    if (type == "pdf") {
                                        fileImgSrc = fileImgSrc + "pdf.png"
                                    } else {
                                        if (type == "psd") {
                                            fileImgSrc = fileImgSrc + "psd.png"
                                        } else {
                                            if (type == "ttf") {
                                                fileImgSrc = fileImgSrc + "ttf.png"
                                            } else {
                                                if (type == "swf") {
                                                    fileImgSrc = fileImgSrc + "swf.png"
                                                } else {
                                                    fileImgSrc = fileImgSrc + "file.png"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (file.type.indexOf("image") == 0) {
                    html += '<div id="uploadList_' + file.index + '" class="upload_append_list">';
                    html += '	<div class="file_bar file_hover">';
                    html += '		<div style="padding:5px;">';
                    html += '			<p class="file_name" title="' + file.name + '">' + file.name + "</p>";
                    html += editHtml;
                    html += delHtml;
                    html += "		</div>";
                    html += "	</div>";
                    html += '	<a style="height:' + para.itemHeight + ";width:" + para.itemWidth + ';" href="#" class="imgBox">';
                    html += '		<div class="uploadImg" style="width:' + imgWidth + "px;max-width:" + imgWidth + "px;max-height:" + imgHeight + 'px;">';
                    html += '			<img id="uploadImage_' + file.index + '" class="upload_image" src="' + e.target.result + '" style="width:expression(this.width > ' + imgWidth + " ? " + imgWidth + 'px : this.width);" />';
                    html += "		</div>";
                    html += "	</a>";
                    html += '	<p id="uploadProgress_' + file.index + '" class="file_progress"></p>';
                    html += '	<p id="uploadFailure_' + file.index + '" class="file_failure">上传失败，请重试</p>';
                    html += '	<p id="uploadTailor_' + file.index + '" class="file_tailor" tailor="false">裁剪完成</p>';
                    html += '	<p id="uploadSuccess_' + file.index + '" class="file_success"></p>';
                    html += "</div>"
                } else {
                    html += '<div id="uploadList_' + file.index + '" class="upload_append_list">';
                    html += '	<div class="file_bar file_hover">';
                    html += '		<div style="padding:5px;">';
                    html += '			<p class="file_name">' + file.name + "</p>";
                    html += delHtml;
                    html += "		</div>";
                    html += "	</div>";
                    html += '	<a style="height:' + para.itemHeight + ";width:" + para.itemWidth + ';" href="#" class="imgBox">';
                    html += '		<div class="uploadImg" style="width:' + imgWidth + 'px">';
                    html += '			<img id="uploadImage_' + file.index + '" class="upload_file" src="' + fileImgSrc + '" style="width:expression(this.width > ' + imgWidth + " ? " + imgWidth + 'px : this.width)" />';
                    html += "		</div>";
                    html += "	</a>";
                    html += '	<p id="uploadProgress_' + file.index + '" class="file_progress"></p>';
                    html += '	<p id="uploadFailure_' + file.index + '" class="file_failure">上传失败，请重试</p>';
                    html += '	<p id="uploadSuccess_' + file.index + '" class="file_success"></p>';
                    html += "</div>"
                }
                return html
            };
            this.createPopupPlug = function(imgSrc, index, name) {
                $("body").zyPopup({
                    src: imgSrc,
                    index: index,
                    name: name,
                    onTailor: function(val, quondamImgInfo) {
                        var nWidth = parseInt(para.itemWidth.replace("px", ""));
                        var nHeight = parseInt(para.itemHeight.replace("px", ""));
                        var qWidth = val.width;
                        var qHeight = val.height;
                        var ratio = nWidth / qWidth;
                        var width = ratio * quondamImgInfo.width;
                        var height = ratio * quondamImgInfo.height;
                        var left = val.leftX * ratio;
                        var top = val.rightY * ratio - qHeight * ratio;
                        $("#uploadImage_" + index).css({
                            "width": width,
                            "height": height,
                            "margin-left": -left,
                            "margin-top": -top
                        });
                        $("#uploadTailor_" + index).show();
                        console.info(val);
                        var tailor = "{'leftX':" + val.leftX + ",'leftY':" + val.leftY + ",'rightX':" + val.rightX + ",'rightY':" + val.rightY + ",'width':" + val.width + ",'height':" + val.height + "}";
                        $("#uploadTailor_" + index).attr("tailor", tailor)
                    }
                })
            };
            this.createCorePlug = function() {
                var params = {
                    fileInput: $("#fileImage").get(0),
                    uploadInput: $("#fileSubmit").get(0),
                    dragDrop: $("#fileDragArea").get(0),
                    url: $("#uploadForm").attr("action"),
                    filterFile: function(files) {
                        return self.funFilterEligibleFile(files)
                    },
                    onSelect: function(selectFiles, allFiles) {
                        para.onSelect(selectFiles, allFiles);
                        self.funSetStatusInfo(ZYFILE.funReturnNeedFiles());
                        var html = "",
                        i = 0;
                        var funDealtPreviewHtml = function() {
                            file = selectFiles[i];
                            if (file) {
                                var reader = new FileReader();
                                reader.onload = function(e) {
                                    html += self.funDisposePreviewHtml(file, e);
                                    i++;
                                    funDealtPreviewHtml()
                                };
                                reader.readAsDataURL(file)
                            } else {
                                funAppendPreviewHtml(html)
                            }
                        };
                        var funAppendPreviewHtml = function(html) {
                            if (para.dragDrop) {
                                $("#preview").append(html)
                            } else {
                                $(".add_upload").before(html)
                            }
                            funBindDelEvent();
                            funBindHoverEvent()
                        };
                        var funBindDelEvent = function() {
                            if ($(".file_del").length > 0) {
                                $(".file_del").click(function() {
                                    ZYFILE.funDeleteFile(parseInt($(this).attr("data-index")), true);
                                    return false
                                })
                            }
                            if ($(".file_edit").length > 0) {
                                $(".file_edit").click(function() {
                                    var imgIndex = $(this).attr("data-index");
                                    var imgName = $(this).prev(".file_name").attr("title");
                                    var imgSrc = $("#uploadImage_" + imgIndex).attr("src");
                                    self.createPopupPlug(imgSrc, imgIndex, imgName);
                                    return false
                                })
                            }
                        };
                        var funBindHoverEvent = function() {
                            $(".upload_append_list").hover(function(e) {
                                $(this).find(".file_bar").addClass("file_hover")
                            },
                            function(e) {
                                // $(this).find(".file_bar").removeClass("file_hover")
                            })
                        };
                        funDealtPreviewHtml()
                    },
                    onDelete: function(file, files) {
                        para.onDelete(file, files);
                        $("#uploadList_" + file.index).fadeOut();
                        self.funSetStatusInfo(files);
                        console.info("剩下的文件");
                        console.info(files)
                    },
                    onProgress: function(file, loaded, total) {
                        var eleProgress = $("#uploadProgress_" + file.index),
                        percent = (loaded / total * 100).toFixed(2) + "%";
                        if (eleProgress.is(":hidden")) {
                            eleProgress.show()
                        }
                        eleProgress.css("width", percent)
                    },
                    onSuccess: function(file, response) {
                        para.onSuccess(file, response);
                        $("#uploadProgress_" + file.index).hide();
                        $("#uploadSuccess_" + file.index).show();
                        if (para.finishDel) {
                            $("#uploadList_" + file.index).fadeOut();
                            self.funSetStatusInfo(ZYFILE.funReturnNeedFiles())
                        }
                        if ($("#uploadTailor_" + file.index).length > 0) {
                            $("#uploadTailor_" + file.index).hide()
                        }
                    },
                    onFailure: function(file, response) {
                        para.onFailure(file, response);
                        $("#uploadProgress_" + file.index).hide();
                        $("#uploadSuccess_" + file.index).show();
                        if ($("#uploadTailor_" + file.index).length > 0) {
                            $("#uploadTailor_" + file.index).hide()
                        }
                        $("#uploadInf").append("<p>文件" + file.name + "上传失败！</p>")
                    },
                    onComplete: function(response) {
                        para.onComplete(response);
                        console.info(response)
                    },
                    onDragOver: function() {
                        $(this).addClass("upload_drag_hover")
                    },
                    onDragLeave: function() {
                        $(this).removeClass("upload_drag_hover")
                    }
                };
                ZYFILE = $.extend(ZYFILE, params);
                ZYFILE.init()
            };
            this.addEvent = function() {
                if ($(".filePicker").length > 0) {
                    $(".filePicker").bind("click",
                    function(e) {
                        $("#fileImage").click()
                    })
                }
                $(".webuploader_pick").bind("click",
                function(e) {
                    $("#fileImage").click()
                });
                $(".upload_btn").bind("click",
                function(e) {
                    if (ZYFILE.funReturnNeedFiles().length > 0) {
                        $("#fileSubmit").click()
                    } else {
                        alert("请先选中文件再点击上传")
                    }
                });
                if ($("#rapidAddImg").length > 0) {
                    $("#rapidAddImg").bind("click",
                    function(e) {
                        $("#fileImage").click()
                    })
                }
            };
            this.init()
        })
    }
})(jQuery);