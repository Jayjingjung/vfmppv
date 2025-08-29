<template>
    <div class="editor-container">
        <!-- Toolbar -->
        <div class="editor-toolbar">
            <button :class="{ active: activeCommand === 'bold' }" @click="handleClick('bold')"><b>B</b></button>

            <button :class="{ active: activeCommand === 'italic' }" @click="handleClick('italic')"><i>I</i></button>

            <button :class="{ active: activeCommand === 'underline' }"
                @click="handleClick('underline')"><u>U</u></button>

            <button @click="handleClick('justifyLeft')">
                <v-icon left>mdi-format-align-left</v-icon>

            </button>
            <button @click="handleClick('justifyCenter')">
                <v-icon left>mdi-format-align-center</v-icon>

            </button>
            <button @click="handleClick('justifyRight')">
                <v-icon left>mdi-format-align-right</v-icon>

            </button>
            <!-- ✅ ปุ่ม justify ทั้งสองด้าน -->
  <!-- ✅ ปุ่ม justify ทั้งสองด้าน -->
  <button @click="handleClick('justifyFull')">
        <v-icon left>mdi-format-align-justify</v-icon>
      </button>            <button @click="handleClick('h2')">H2</button>
            <button @click="handleClick('h3')">H3</button>

            <!-- Font Size -->
            <select @change="setFontSize($event)">
                <option value="">Size</option>
                <option value="1">10px</option>
                <option value="2">13px</option>
                <option value="3">16px</option>
                <option value="4">18px</option>
                <option value="5">24px</option>
                <option value="6">32px</option>
                <option value="7">48px</option>
            </select>

            <!-- Text Color -->
            <input type="color" @input="setTextColor($event)" />

            <!-- Background Color -->
            <input type="color" @input="setBgColor($event)" />

            <button @click="handleClick('link')">
                <v-icon>mdi-link</v-icon>

            </button>
            <button @click="handleClick('image')">
                <v-icon>mdi-image-outline</v-icon>
            </button>
            <!-- Toolbar -->
            <input style="width: 90px;border: 1px solid #ddd;
    padding: 10px;
    font-size: 14px;" type="number" placeholder="Width" @input="resizeImage($event, 'width')" />
            <input style="width: 90px;border: 1px solid #ddd;
    padding: 10px;
    font-size: 14px;" type="number" placeholder="Height" @input="resizeImage($event, 'height')" />

            <button @click="togglePreview">
                <v-icon>mdi-eye-outline</v-icon>
            </button>
            <v-btn variant="outlined" color="primary" @click="saveContent">Save</v-btn>
        </div>

        <!-- Editable Area -->
        <div v-show="!previewMode" ref="editor" class="editor-area" contenteditable="true"></div>

        <!-- Preview -->
        <div v-if="previewMode" class="preview-container" v-html="content"></div>


    </div>

</template>

<script>
import Swal from "sweetalert2"; // ✅ ต้อง import SweetAlert2
export default {
    data() {
        return {
            content: '',
            previewMode: false,
            activeCommand: '', // track last clicked
        };
    },
    mounted() {
        this.$refs.editor.addEventListener("click", (e) => {
            if (e.target.tagName === "IMG") {
                // ล้าง selection เดิม
                this.$refs.editor.querySelectorAll("img").forEach(img => img.classList.remove("selected"));
                e.target.classList.add("selected");

                // autofill input values
                const widthInput = document.querySelector('input[placeholder="Width"]');
                const heightInput = document.querySelector('input[placeholder="Height"]');
                if (widthInput) widthInput.value = e.target.width;
                if (heightInput) heightInput.value = e.target.height;
            }
        });
    }

    ,
    methods: {
        handleClick(command) {
            this.activeCommand = command; // mark active
            console.log("Clicked:", command);

            if (command === "h2" || command === "h3") {
                document.execCommand("formatBlock", false, command);
            } else if (command === "link") {
                this.addLink();
            } else if (command === "image") {
                this.addMedia();
            } else {
                document.execCommand(command, false, null);
            }

            this.updateContent();
        },
        setFontSize(event) {
            const size = event.target.value;
            if (size) {
                document.execCommand("fontSize", false, size);
                this.activeCommand = `fontSize-${size}`;
                console.log("Font size changed:", size);
            }
            this.updateContent();
        },
        setTextColor(event) {
            const color = event.target.value;
            document.execCommand("foreColor", false, color);
            this.activeCommand = "textColor";
            console.log("Text color:", color);
            this.updateContent();
        },
        setBgColor(event) {
            const color = event.target.value;
            document.execCommand("hiliteColor", false, color);
            this.activeCommand = "bgColor";
            console.log("Background color:", color);
            this.updateContent();
        },
        addLink() {
            const url = prompt("Enter URL:");
            if (url) {
                document.execCommand("createLink", false, url);
            }
        },
        addMedia() {
            const mediaUrl = prompt("Enter Image URL:");
            if (mediaUrl) {
                document.execCommand(
                    "insertHTML",
                    false,
                    `<img src="${mediaUrl}" style="max-width:100%; height:auto;" />`
                );
            }
        },
        //         addMedia() {
        //   const mediaUrl = prompt("Enter Image URL:");
        //   if (mediaUrl) {
        //     const width = prompt("Enter width (px or %):", "300");
        //     const height = prompt("Enter height (px or 100%):", "100%");
        //     document.execCommand(
        //       "insertHTML",
        //       false,
        //       `<img src="${mediaUrl}" style="width:${width}${isNaN(width) ? '' : 'px'}; height:${height}${isNaN(height) ? '' : 'px'};" />`
        //     );
        //   }
        // }
        // ,
        resizeImage(event, type) {
            const value = event.target.value;
            const img = this.$refs.editor.querySelector("img.selected");
            if (img) {
                if (type === "width") img.style.width = value + "px";
                if (type === "height") img.style.height = value + "px";
                this.updateContent();
            }
        }


        ,
        togglePreview() {
            this.content = this.$refs.editor.innerHTML;
            this.previewMode = !this.previewMode;
        },
        updateContent() {
            this.content = this.$refs.editor.innerHTML;
        },

        // ✅ ฟังก์ชัน Save พร้อม SweetAlert
        saveContent() {
            this.content = this.$refs.editor.innerHTML;
            Swal.fire({
                title: "บันทึกสำเร็จ!",
                text: "ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว",
                icon: "success",
                confirmButtonText: "OK",
            });
            console.log("Saved content:", this.content);
        },
    },
};
</script>

<style scoped>
.editor-container {
    width: 100%;
    max-width: 850px;
    margin: 0 auto;
    background: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.editor-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 15px;
    align-items: center;
}

.editor-toolbar button,
.editor-toolbar select,
.editor-toolbar input[type="color"] {
    padding: 6px 10px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
}

.editor-toolbar button:hover {
    background: #f0f0f0;
}

.editor-toolbar button.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
}

.editor-area {
    min-height: 220px;
    border: 1px solid #ddd;
    padding: 10px;
    font-size: 14px;
    border-radius: 5px;
}

.editor-area img.selected {
    outline: 2px solid #007bff;
}


/* .editor-area img {
  max-width: 100%;
  height: auto;
  resize: both;
  overflow: auto;
  display: inline-block;
} */

.preview-container {
    border: 1px solid #ddd;
    padding: 20px;
    background: #f9f9f9;
}
</style>