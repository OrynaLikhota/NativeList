import React, { FC } from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback, Text } from 'react-native';
import { TextInput, IconButton, Button } from 'react-native-paper';
import { useFormik } from 'formik';

import { listFormSchema } from '../schemas/index';
import store from '../../../src/store/index';
import { List } from '../../../src/models';

export interface IAddGoodsModal {
  visible: boolean,
  hideModal: any
}

export interface IAddGoodsModalModel {
  listName: string,
  listDetails: string
}

const AddGoodsModal: FC<IAddGoodsModal> = ({
  visible, hideModal,
}) => {
  const addNewList = (value: IAddGoodsModalModel): void => {
    const listIem = {
      ...value, 
      id: '1',
      items: [],
    }
    store.setNewList(listIem as List);
    hideModal();
  }
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik<IAddGoodsModalModel>({
    initialValues: {
      listName: '',
      listDetails: ''
    },
    validationSchema: listFormSchema,
    onSubmit: (values: IAddGoodsModalModel) => {
      addNewList(values);
    },

  });
  return (
    <Modal visible={visible} onDismiss={hideModal} transparent={true} >
      <TouchableWithoutFeedback onPress={() => hideModal()}>
        <View style={styles.modalStyle}>
          <TouchableWithoutFeedback>
            <View style={styles.modalInner}>
              <View style={styles.modalHeaderStyles}>
                <Text>Add new list to list: </Text>
                <IconButton
                  icon="close"
                  size={20}
                  mode='contained'
                  onPress={() => hideModal()}
                />
              </View>
              <TextInput
                mode="outlined"
                label="Add List Name"
                style={styles.fullWidth}
                value={values.listName}
                onChangeText={handleChange('listName')}
                onBlur={handleBlur('listName')}
              />
              {
                errors.listName && touched.listName ?
                  <View>
                    <Text style={styles.error}>{errors.listName}</Text>
                  </View> : null
              }
              <TextInput
                mode="outlined"
                label="Add List Details"
                style={styles.fullWidth}
                value={values.listDetails}
                onChangeText={handleChange('listDetails')}
                onBlur={handleBlur('listDetails')}
              />
              {
                errors.listDetails && touched.listDetails ?
                  <View>
                    <Text style={styles.error}>{errors.listDetails}</Text>
                  </View> : null
              }
              <Button
                style={styles.fullWidth}
                mode="contained"
                onPress={handleSubmit}
              >
                <Text>Add Item</Text>
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddGoodsModal;
const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalInner: {
    height: 300,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  closeRightStyles: {
    alignSelf: 'flex-end'
  },
  modalHeaderStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  error: {
    color: 'red',
    paddingTop: 10,
    paddingBottom: 5
  },
  fullWidth: {
    width: '100%'
  }
});