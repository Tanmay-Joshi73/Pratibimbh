import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation';
import { useNavigation } from '@react-navigation/native';
import { styles } from './HomescreenStyle';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'bn', label: 'Bengali' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'ta', label: 'Tamil' },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [sourceText, setSourceText] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('hi');
  const [loading, setLoading] = useState(false);
  const [transliterated, setTransliterated] = useState('');

  const onConvert = () => {
    if (!sourceText.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setTransliterated(sourceText + ' (converted)');
      setLoading(false);
    }, 1000);
  };

  const swapLanguages = () => {
    const temp = fromLang;
    setFromLang(toLang);
    setToLang(temp);
  };

  const getLanguageLabel = (code: string) => {
    return LANGUAGES.find(l => l.code === code)?.label || code;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon}>
            <Text style={styles.starIcon}>★</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Google Translate</Text>
          <View style={styles.profileIcon}>
            <Text style={styles.profileText}>J</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Text Input */}
          <View style={styles.inputContainer}>
            <TextInput
              value={sourceText}
              onChangeText={setSourceText}
              placeholder="Enter text"
              placeholderTextColor="#5f6368"
              multiline
              style={styles.textInput}
              textAlignVertical="top"
            />
          </View>

          {/* Result */}
          {transliterated ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{transliterated}</Text>
            </View>
          ) : null}
        </ScrollView>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Language Selector */}
          <View style={styles.languageBar}>
            <TouchableOpacity style={styles.languageButton}>
              <Text style={styles.languageText}>{getLanguageLabel(fromLang)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.swapButton} onPress={swapLanguages}>
              <Text style={styles.swapIcon}>⇄</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.languageButton}>
              <Text style={styles.languageText}>{getLanguageLabel(toLang)}</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            {/* Conversation Button */}
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.iconCircle}>
                <Text style={styles.actionIcon}>👥</Text>
              </View>
              <Text style={styles.actionLabel}>Conversation</Text>
            </TouchableOpacity>

            {/* Microphone Button */}
            <TouchableOpacity
              style={styles.mainActionButton}
              onPress={onConvert}
              disabled={loading || !sourceText.trim()}
            >
              {loading ? <ActivityIndicator color="#fff" size="large" /> : <Text style={styles.micIcon}>🎤</Text>}
            </TouchableOpacity>

            {/* Camera Button */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Camera')}
            >
              <View style={styles.iconCircle}>
                <Text style={styles.actionIcon}>📷</Text>
              </View>
              <Text style={styles.actionLabel}>Camera</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hidden Pickers */}
        <View style={styles.pickerContainer}>
          <Picker selectedValue={fromLang} onValueChange={setFromLang} style={styles.hiddenPicker}>
            {LANGUAGES.map(l => (
              <Picker.Item key={l.code} label={l.label} value={l.code} />
            ))}
          </Picker>
          <Picker selectedValue={toLang} onValueChange={setToLang} style={styles.hiddenPicker}>
            {LANGUAGES.map(l => (
              <Picker.Item key={l.code} label={l.label} value={l.code} />
            ))}
          </Picker>
        </View>
      </View>
    </>
  );
}
