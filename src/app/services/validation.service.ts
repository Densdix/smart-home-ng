import { Injectable } from '@angular/core';
import {
  FormValidationResult,
  ValidationError,
} from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  validateDashboardCreation(
    id: string,
    title: string,
    icon: string
  ): FormValidationResult {
    const errors: ValidationError[] = [];

    if (!id || id.trim() === '') {
      errors.push({ field: 'id', message: 'ID обязателен' });
    } else if (id.length > 30) {
      errors.push({
        field: 'id',
        message: 'ID не может быть длиннее 30 символов',
      });
    } else if (!/^[\w-]+$/.test(id)) {
      errors.push({
        field: 'id',
        message:
          'ID может содержать только буквы, цифры, дефисы и подчеркивания',
      });
    }

    if (!title || title.trim() === '') {
      errors.push({ field: 'title', message: 'Название обязательно' });
    } else if (title.length > 50) {
      errors.push({
        field: 'title',
        message: 'Название не может быть длиннее 50 символов',
      });
    }

    if (!icon || icon.trim() === '') {
      errors.push({ field: 'icon', message: 'Иконка обязательна' });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateTabCreation(
    title: string,
    existingTabs: string[]
  ): FormValidationResult {
    const errors: ValidationError[] = [];

    if (!title || title.trim() === '') {
      errors.push({ field: 'title', message: 'Название вкладки обязательно' });
    } else if (title.length > 50) {
      errors.push({
        field: 'title',
        message: 'Название вкладки не может быть длиннее 50 символов',
      });
    } else if (existingTabs.includes(title.trim())) {
      errors.push({
        field: 'title',
        message: 'Вкладка с таким названием уже существует',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateCardCreation(layout: string): FormValidationResult {
    const errors: ValidationError[] = [];

    if (!layout) {
      errors.push({ field: 'layout', message: 'Выберите тип макета карточки' });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateCardTitle(title: string): FormValidationResult {
    const errors: ValidationError[] = [];

    if (title && title.length > 50) {
      errors.push({
        field: 'title',
        message: 'Название карточки не может быть длиннее 50 символов',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  getFieldError(errors: ValidationError[], field: string): string | null {
    const error = errors.find((e) => e.field === field);
    return error ? error.message : null;
  }
}
