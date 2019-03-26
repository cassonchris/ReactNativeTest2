import React from "react";
import {
    StyleSheet,
    Text,
    View,
    LayoutAnimation,
    Dimensions,
    ScrollView
} from "react-native";
import { BarCodeScanner, Permissions } from "expo";

export default class App extends React.Component {
    state = {
        hasCameraPermission: null,
        lastScannedCode: null,
        lastScannedResponse: null
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === "granted"
        });
    };

    _handleBarCodeRead = result => {
        if (result.data !== this.state.lastScannedCode) {
            LayoutAnimation.spring();
            this.setState({ lastScannedCode: result.data });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        this.state.hasCameraPermission === null
                            ? <Text>Requesting for camera permission</Text>
                            : this.state.hasCameraPermission === false
                                ? <Text>Camera permission is not granted</Text>
                                : <BarCodeScanner
                                    onBarCodeRead={this._handleBarCodeRead}
                                    style={styles.scanner} />
                    }
                </ScrollView>
                <View>
                    <Text style={styles.codeValue}>
                        {this.state.lastScannedCode}
                    </Text>
                </View>
                <View>
                    <Text style={styles.codeValue}>
                        {this.state.lastScannedResponse}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    scanner: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width
    },
    codeValue: {

        fontSize: 24,
        fontWeight: "bold",
        color: "red"
    }
});
