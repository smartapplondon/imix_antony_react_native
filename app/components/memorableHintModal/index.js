import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,

} from "react-native";
import * as colors from '../../constants/colors';
import Modal from "react-native-modal";
export default class MemorableHintModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        }
    }


    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {
        return (
            <Modal isVisible={this.state.isModalVisible}>
                <View style={{ backgroundColor: '#fff', height: '30%', width: '80%', alignSelf: 'center', borderRadius: 10 }}>
                    <Text style={{ color: colors.primaryColor, textAlign: 'center', marginTop: '10%' }}>Hint</Text>
                    <Text style={{ color: 'gray', marginTop: '10%', marginLeft: '8%' }}>My first pet name</Text>
                    <View
                        style={{
                            borderBottomColor: colors.primaryColor,
                            borderBottomWidth: 1,
                            marginTop: '8%'
                        }}
                    />


                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={this.toggleModal} style={{ width: '50%', height: '100%', borderBottomLeftRadius: 5, justifyContent: 'center', }}>
                            <Text style={{ textAlign: 'center', color: colors.primaryColor }}>close</Text>
                        </TouchableOpacity>
                        {/* <View
                                            style={{
                                                borderLeftWidth: 1,
                                                borderLeftColor: colors.primaryColor,
                                            }}
                                        /> */}
                        <View style={{ width: '50%', borderLeftColor: colors.primaryColor, borderLeftWidth: 1, height: '100%', borderBottomRightRadius: 5, justifyContent: 'center', }}>
                            <Text style={{ textAlign: 'center', color: colors.primaryColor }}>support</Text>
                        </View>
                    </View>
                    {/* <TouchableOpacity title="Hide modal" onPress={this.toggleModal} > </TouchableOpacity> */}
                </View>
            </Modal>
        );
    }
}