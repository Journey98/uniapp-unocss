<template>
     <view class="bottom-button-home">
            <view class="bottom-line" v-if="showLine"></view>
            <view class="bottom-button-wrapper">
                <view class="bottom-button-left" v-if="showLeftButton" @click="clickLeftText()">{{leftText}}</view>
                <view :class="getRightButtonClass()" @click="clickRightText()">{{rightText}}</view>
            </view>
        </view>
</template>
<script setup lang="ts">
    const props = defineProps({
        rightText:{
            type: String,
            default: ''
        },
        leftText:{
            type: String,
            default: ''
        },
        isCanclickRightButton:{
            type: Boolean,
            default: true
        },
        showLeftButton:{
            type: Boolean,
            default: true
        },
        showLine:{
            type: Boolean,
            default: true
        }
    })

    const emit = defineEmits(['clickLeftText', 'clickRightText'])

    //创建文件夹
    function clickLeftText(){
        emit('clickLeftText')
    }

    //点击右侧按钮
    function clickRightText(){
        if(props.isCanclickRightButton){
            emit('clickRightText')
        }
    }


    function getRightButtonClass(){
        if(props.isCanclickRightButton){
            return 'bottom-button-right'
        }else{
            return 'bottom-button-right-disable'
        }
    }

</script>

<style lang="scss">

.bottom-button-home{
        width: 100%;
        height: 116rpx;
        background-color: white;
        display: flex;
        flex-direction: column;
        z-index: 9999;
         height: calc(116rpx + constant(safe-area-inset-bottom)); // 兼容 IOS<11.2
        height: calc(116rpx + env(safe-area-inset-bottom)); // 兼容 IOS>11.2
         padding-bottom: constant(safe-area-inset-bottom);  
        padding-bottom: env(safe-area-inset-bottom); 
         .bottom-line{
            height: 2rpx;
            background-color: #EBECED;
        }

      .bottom-button-wrapper{
        height: 114rpx;
        width: 100%;
        background-color: white;
        display: flex;
        flex-direction: row;
        align-items: center;
        .bottom-button-left{
            height: 88rpx;
            background: #FFFFFF;
            border-radius: 8rpx;
            border: 1px solid #DFE1E6;
            font-size: 32rpx;
            color: black;
            line-height: 88rpx;
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-left:32rpx;

        }
        .bottom-button-right{
            flex: 1;
            height: 88rpx;
            background: #377ef6;
            border-radius: 8rpx;
            line-height: 88rpx;
            color: #FFFFFF;
            font-size: 32rpx;
            margin-right: 32rpx;
            margin-left:34rpx ;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }
        .bottom-button-right-disable{
            flex: 1;
            height: 88rpx;
            background: #B9D1FB;
            border-radius: 8rpx;
            line-height: 88rpx;
            color: #FFFFFF;
            font-size: 32rpx;
            margin-right: 32rpx;
            margin-left:34rpx ;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }
      }  
    }

</style>