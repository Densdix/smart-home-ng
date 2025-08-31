import { Injectable } from '@angular/core';
import {
  ValidationError,
  FormValidationResult,
} from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  validateTabCreation(
    title: string,
    existingTitles: string[]
  ): FormValidationResult {
    const errors: ValidationError[] = [];

    if (!title || title.trim().length === 0) {
      errors.push({
        field: 'title',
        message: 'Название вкладки не может быть пустым',
      });
    }

    if (title && title.trim().length < 2) {
      errors.push({
        field: 'title',
        message: 'Название вкладки должно содержать минимум 2 символа',
      });
    }

    if (title && title.trim().length > 50) {
      errors.push({
        field: 'title',
        message: 'Название вкладки не может превышать 50 символов',
      });
    }

    if (title && existingTitles.includes(title.trim())) {
      errors.push({
        field: 'title',
        message: 'Вкладка с таким названием уже существует',
      });
    }

    if (title && /["*/:<>?\\|]/.test(title)) {
      errors.push({
        field: 'title',
        message:
          'Название не может содержать специальные символы: < > : " / \\ | ? *',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateCardTitle(title: string): FormValidationResult {
    const errors: ValidationError[] = [];

    if (!title || title.trim().length === 0) {
      errors.push({
        field: 'title',
        message: 'Название карточки не может быть пустым',
      });
    }

    if (title && title.trim().length < 2) {
      errors.push({
        field: 'title',
        message: 'Название карточки должно содержать минимум 2 символа',
      });
    }

    if (title && title.trim().length > 100) {
      errors.push({
        field: 'title',
        message: 'Название карточки не может превышать 100 символов',
      });
    }

    if (title && /["*/:<>?\\|]/.test(title)) {
      errors.push({
        field: 'title',
        message:
          'Название не может содержать специальные символы: < > : " / \\ | ? *',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateDashboardCreation(
    id: string,
    title: string,
    icon: string
  ): FormValidationResult {
    const errors: ValidationError[] = [];

    if (!id || id.trim().length === 0) {
      errors.push({
        field: 'id',
        message: 'ID дашборда не может быть пустым',
      });
    }

    if (id && id.trim().length < 3) {
      errors.push({
        field: 'id',
        message: 'ID дашборда должен содержать минимум 3 символа',
      });
    }

    if (id && id.trim().length > 30) {
      errors.push({
        field: 'id',
        message: 'ID дашборда не может превышать 30 символов',
      });
    }

    if (id && !/^[\dA-Za-z-]+$/.test(id)) {
      errors.push({
        field: 'id',
        message: 'ID может содержать только буквы, цифры и дефисы',
      });
    }

    if (!title || title.trim().length === 0) {
      errors.push({
        field: 'title',
        message: 'Название дашборда не может быть пустым',
      });
    }

    if (title && title.trim().length < 3) {
      errors.push({
        field: 'title',
        message: 'Название дашборда должно содержать минимум 3 символа',
      });
    }

    if (title && title.trim().length > 100) {
      errors.push({
        field: 'title',
        message: 'Название дашборда не может превышать 100 символов',
      });
    }

    if (!icon || icon.trim().length === 0) {
      errors.push({
        field: 'icon',
        message: 'Иконка дашборда не может быть пустой',
      });
    }

    if (title && /["*/:<>?\\|]/.test(title)) {
      errors.push({
        field: 'title',
        message:
          'Название не может содержать специальные символы: < > : " / \\ | ? *',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateCardContent(items: unknown[]): FormValidationResult {
    const errors: ValidationError[] = [];

    if (!items || items.length === 0) {
      errors.push({
        field: 'items',
        message: 'Карточка должна содержать хотя бы один элемент',
      });
    }

    if (items && items.length > 20) {
      errors.push({
        field: 'items',
        message: 'Карточка не может содержать более 20 элементов',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateDeviceLabel(label: string): FormValidationResult {
    const errors: ValidationError[] = [];

    if (!label || label.trim().length === 0) {
      errors.push({
        field: 'label',
        message: 'Название устройства не может быть пустым',
      });
    }

    if (label && label.trim().length < 2) {
      errors.push({
        field: 'label',
        message: 'Название устройства должно содержать минимум 2 символа',
      });
    }

    if (label && label.trim().length > 50) {
      errors.push({
        field: 'label',
        message: 'Название устройства не может превышать 50 символов',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateForm(
    formData: Record<string, unknown>,
    validationRules: Record<string, (value: unknown) => FormValidationResult>
  ): FormValidationResult {
    const allErrors: ValidationError[] = [];

    for (const [field, validator] of Object.entries(validationRules)) {
      const result = validator(formData[field]);
      if (!result.isValid) {
        allErrors.push(...result.errors);
      }
    }

    return {
      isValid: allErrors.length === 0,
      errors: allErrors,
    };
  }
}
