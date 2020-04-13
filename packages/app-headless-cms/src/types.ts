import * as React from "react";
import { Plugin } from "@webiny/plugins/types";
import { ReactElement } from "react";

import { I18NStringValue } from "@webiny/app-i18n/types";
import { BindComponent, FormChildrenFunctionParams, Form } from "@webiny/form";
import { ApolloClient } from "apollo-client";
import { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

export type CmsBuilderFieldValidator = {
    name: string;
    message: I18NStringValue;
    settings: any;
};

export type CmsBuilderFormFieldValidatorPlugin = Plugin & {
    type: "content-model-editor-field-validator";
    validator: {
        name: string;
        label: string;
        description: string;
        defaultMessage: string;
        renderSettings?: (props: {
            Bind: BindComponent;
            setValue: (name: string, value: any) => void;
            setMessage: (message: string) => void;
            data: CmsBuilderFieldValidator;
        }) => React.ReactElement;
    };
};

export type CmsFormFieldPatternValidatorPlugin = Plugin & {
    type: "content-model-editor-field-validator-pattern";
    pattern: {
        name: string;
        message: string;
        label: string;
    };
};

export type CmsFormFieldValidator = {
    name: string;
    message: any;
    settings: any;
};

export type CmsFormFieldValidatorPlugin = Plugin & {
    type: "form-field-validator";
    validator: {
        name: string;
        validate: (value: any, validator: CmsFormFieldValidator) => Promise<any>;
    };
};

export type FieldIdType = string;
export type CmsContentModelModelFieldsLayout = FieldIdType[][];

export type FieldLayoutPositionType = {
    row: number;
    index: number;
};

export type FbBuilderFieldPlugin = Plugin & {
    type: "content-model-editor-field-type";
    field: {
        group?: string;
        unique?: boolean;
        type: string;
        name: string;
        label: string;
        validators?: string[];
        description: string;
        icon: React.ReactNode;
        createField: ({ i18n: any }) => CmsContentModelModelField;
        renderSettings?: (params: {
            form: FormChildrenFunctionParams;
            afterChangeLabel: (value: string) => void;
            uniqueFieldIdValidator: (fieldId: string) => void;
        }) => React.ReactNode;
    };
};

export type CmsContentModelModel = {
    id: FieldIdType;
    version: number;
    parent: string;
    layout: CmsContentModelModelFieldsLayout;
    fields: CmsContentModelModelField[];
    name: string;
    settings: any;
    status: string;
    savedOn: string;
    revisions: any[];
    overallStats: {
        submissions: number;
        views: number;
        conversionRate: number;
    };
};

export type CmsContentModelModelField = {
    _id?: string;
    type: string;
    name: string;
    fieldId?: FieldIdType;
    label?: I18NStringValue;
    helpText?: I18NStringValue;
    placeholderText?: I18NStringValue;
    validation?: CmsBuilderFieldValidator[];
    options?: Array<{ value: string; label: I18NStringValue }>;
    settings: { [key: string]: any };
};

export type CmsEditorFormSettingsPlugin = Plugin & {
    type: "content-model-editor-form-settings";
    title: string;
    description: string;
    icon: React.ReactElement<any>;
    render(props: { Bind: BindComponent; form: Form; formData: any }): React.ReactNode;
    renderHeaderActions?(props: {
        Bind: BindComponent;
        form: Form;
        formData: any;
    }): React.ReactNode;
};

export type CmsIcon = {
    /**
     * [ pack, icon ], ex: ["fab", "cog"]
     */
    id: [IconPrefix, IconName];
    /**
     * Icon name
     */
    name: string;
    /**
     * SVG element
     */
    svg: ReactElement;
};

export type CmsIconsPlugin = Plugin & {
    type: "cms-icons";
    getIcons(): CmsIcon[];
};

// ------------------------------------------------------------------------------------------------------------

export type FormRenderCmsContentModelModelField = CmsContentModelModelField & {
    validators: Array<(value: any) => boolean>;
};

export type CmsContentModelFormProps = {
    getFieldById: Function;
    getFieldByFieldId: Function;
    getDefaultValues: () => { [key: string]: any };
    getFields: () => Array<Array<FormRenderCmsContentModelModelField>>;
    loading: boolean;
    onSubmit: () => void;
    data: { [key: string]: any };
};

export type CmsContentModelForm = {
    loading?: boolean;
    preview?: boolean;
    contentModel: CmsContentModelModel;
    data?: { [key: string]: any };
    onSubmit?: () => void;
};

export type UseContentModelEditorReducerStateType = {
    apolloClient: ApolloClient<any>;
    id: string;
    defaultLayoutRenderer: string;
};

export type FormSettingsPluginType = Plugin & {
    title: string;
    description: string;
    icon: React.ReactNode;
    render: FormSettingsPluginRenderFunctionType;
};

export type FormSettingsPluginRenderFunctionType = (props: {
    Bind: BindComponent;
    formData: any; // Content model settings.
    form: any;
}) => React.ReactElement<any>;