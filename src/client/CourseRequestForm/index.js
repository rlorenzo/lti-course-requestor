/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// before mounting your React application:
import { theme } from '@instructure/canvas-theme';
theme.use();

import { Button } from '@instructure/ui-buttons';
import { Checkbox, CheckboxGroup } from '@instructure/ui-checkbox';
import { Flex } from '@instructure/ui-flex';
import { FormFieldGroup } from '@instructure/ui-form-field';
import { Table } from '@instructure/ui-table';
import { TextInput } from '@instructure/ui-text-input';

import * as constants from '../styling_constants';

const CourseRequestForm = ({courses}) => {
    const [emailToggleValue, toggleEmail] = useState(false);
    const handleEmailToggle = (() => {
        toggleEmail(!emailToggleValue);
    });
    const CrossListings = ({term, courseInfoList}) => {
        if (courseInfoList.length !== 0) {
            return (
                courseInfoList.map((courseInfo, index) => (
                    <Checkbox
                        key={index}
                        size='small'
                        label={ term + '-' + courseInfo.classID + ' (' + courseInfo.subjectAreaCode + ' ' + courseInfo.courseCatalogNumberDisplay + '-' + courseInfo.classNumber + ')' }
                        defaultChecked
                    >
                    </Checkbox>
                ))
            );
        }
        return null;
    };
    const SettingCheckbox = ({isChecked}) => (
        isChecked ? <Checkbox label='' size='small' defaultChecked/> : <Checkbox label='' size='small'/>
    );

    const [classTypeStyling, setClassTypeStyling] = React.useState({
        'ugrad': constants.ugradRow,
        'grad': constants.gradRow,
        'tut': constants.tutRow,
    });
    const handleClassTypeFilter = ((toggleClassType, event) => {
        let updatedClassTypeStyling = classTypeStyling;
        if (toggleClassType == 'ugrad') {
            if ((updatedClassTypeStyling['ugrad'].background == constants.ugradRow.background) && (updatedClassTypeStyling['ugrad'].color == constants.ugradRow.color)) {
                updatedClassTypeStyling['ugrad'] = {};
            } else {
                updatedClassTypeStyling['ugrad'] = constants.ugradRow;
            }
        } else if (toggleClassType == 'grad') {
            if ((updatedClassTypeStyling['grad'].background == constants.gradRow.background) && (updatedClassTypeStyling['grad'].color == constants.gradRow.color)) {
                updatedClassTypeStyling['grad'] = {};
            } else {
                updatedClassTypeStyling['grad'] = constants.gradRow;
            }
        } else if (toggleClassType == 'tut') {
            if ((updatedClassTypeStyling['tut'].background === constants.tutRow.background) && (updatedClassTypeStyling['tut'].color === constants.tutRow.color)) {
                updatedClassTypeStyling['tut'] = {};
            } else {
                updatedClassTypeStyling['tut'] = constants.tutRow;
            }
        }
        setClassTypeStyling(updatedClassTypeStyling);
        console.log(classTypeStyling);
    });
    const classTypeFilter = ['ugrad', 'grad', 'tut'];
    const courseListings = courses.map((course, index) => (
        <Table.Row key={index}>
            <Table.Cell theme={classTypeStyling[course.classType]}>{course.requestID}</Table.Cell>
            <Table.Cell theme={classTypeStyling[course.classType]}>{course.offeredTermCode}</Table.Cell>
            <Table.Cell theme={classTypeStyling[course.classType]}>{course.classID}</Table.Cell>
            <Table.Cell theme={classTypeStyling[course.classType]}>{course.subjectAreaCode}</Table.Cell>
            <Table.Cell theme={classTypeStyling[course.classType]}>{ course.courseCatalogNumberDisplay + '-' + course.classNumber }</Table.Cell>
            <Table.Cell theme={classTypeStyling[course.classType]}>
                <CrossListings term={course.offeredTermCode} courseInfoList={course.crosslistedCourses}></CrossListings>
                <TextInput width='200px' renderLabel=''/>
                <Button>Add additional Class ID</Button>
            </Table.Cell>
            <Table.Cell theme={classTypeStyling[course.classType]}>{course.timeRequested}</Table.Cell>
            <Table.Cell theme={classTypeStyling[course.classType]}>
                <TextInput width='200px' type='email' renderLabel=''/>
            </Table.Cell>
            <Table.Cell theme={classTypeStyling[course.classType]}>{course.status}</Table.Cell>
            <Table.Cell theme={classTypeStyling[course.classType]}>
                <Flex justifyItems='center'>
                    <Flex.Item>
                        <SettingCheckbox isChecked={course.emailInstructors}></SettingCheckbox>
                    </Flex.Item>
                </Flex>
            </Table.Cell>
            <Table.Cell theme={classTypeStyling[course.classType]}>
                <Flex justifyItems='center'>
                    <Flex.Item>
                        <SettingCheckbox isChecked={course.sendUrl}></SettingCheckbox>
                    </Flex.Item>
                </Flex>
            </Table.Cell>
            <Table.Cell theme={classTypeStyling[course.classType]}>
                <Flex justifyItems='center'>
                    <Flex.Item>
                        <SettingCheckbox isChecked={course.toBeBuilt}></SettingCheckbox>
                    </Flex.Item>
                </Flex>
            </Table.Cell>
        </Table.Row>
    ));
    return (
        <FormFieldGroup label='' description=''>
            <TextInput width='400px' type='email' renderLabel='Email to contact when these courses are built:'/>
            <Checkbox onChange={handleEmailToggle} size='small' label='Toggle email instructors' />
            <CheckboxGroup
                description='Build filters:'
                layout='columns'
                defaultValue={classTypeFilter}
                name='buildfilters'
                size='small'
            >
                <Checkbox label='ugrad' value='ugrad' onChange={(e) => handleClassTypeFilter('ugrad', e)}/>
                <Checkbox label='grad' value='grad' onChange={(e) => handleClassTypeFilter('grad', e)}/>
                <Checkbox label='tut' value='tut' onChange={(e) => handleClassTypeFilter('tut', e)}/>
            </CheckboxGroup>
            <Table caption=''>
                <Table.Head>
                    <Table.Row>
                        <Table.ColHeader theme={constants.courseListHeader} id='requestID'>Request ID</Table.ColHeader>
                        <Table.ColHeader theme={constants.courseListHeader} id='term'>Term</Table.ColHeader>
                        <Table.ColHeader theme={constants.courseListHeader} id='classID'>Class ID</Table.ColHeader>
                        <Table.ColHeader theme={constants.courseListHeader} id='department'>Department</Table.ColHeader>
                        <Table.ColHeader theme={constants.courseListHeader} id='course'>Course</Table.ColHeader>
                        <Table.ColHeader theme={constants.courseListHeader} id='crosslistedclassIDs'>Crosslisted Class IDs</Table.ColHeader>
                        <Table.ColHeader theme={constants.courseListHeader} id='timerequested'>Time requested</Table.ColHeader>
                        <Table.ColHeader theme={constants.courseListHeader} id='requestoremail'>Requestor Email</Table.ColHeader>
                        <Table.ColHeader theme={constants.courseListHeader} id='status'>Status</Table.ColHeader>
                        <Table.ColHeader theme={constants.courseListHeader} id='emailinstructors'>Email instructors</Table.ColHeader>
                        <Table.ColHeader theme={constants.courseListHeader} id='sendurl'>Send class link to MyUCLA</Table.ColHeader>
                        <Table.ColHeader theme={constants.courseListHeader} id='tobebuilt'>To be built</Table.ColHeader>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {courseListings}
                </Table.Body>
            </Table>
            <Button type='submit' color='secondary'>Submit requests</Button>
        </FormFieldGroup>
    );
}

export default CourseRequestForm;
